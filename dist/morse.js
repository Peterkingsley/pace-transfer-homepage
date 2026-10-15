'use strict';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const rail = document.querySelector('#hero-rail');
const cards = [...document.querySelectorAll('[data-story]')];
const pauseButton = document.querySelector('#pause-stories');
let current = 2;
let paused = reduceMotion.matches;
let timer;
let galleryOnScreen = true;
let centeringTimer;

function centerCard(smooth = true) {
  const card = cards[current];
  rail.scrollTo({left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2, behavior: smooth && !reduceMotion.matches ? 'smooth' : 'instant'});
}
function selectStory(index, fromUser = false) {
  current = (index + cards.length) % cards.length;
  cards.forEach((card, i) => {
    card.classList.toggle('is-active', i === current);
    card.setAttribute('aria-pressed', String(i === current));
  });
  document.querySelector('#story-number').textContent = String(current + 1).padStart(2, '0');
  clearTimeout(centeringTimer);
  centeringTimer = setTimeout(() => centerCard(), reduceMotion.matches ? 0 : 680);
  if (fromUser) { paused = true; updatePause(); }
}
function updatePause() {
  pauseButton.setAttribute('aria-label', paused ? 'Play image gallery' : 'Pause image gallery');
  pauseButton.innerHTML = paused ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 8 6-8 6Z"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg>';
  clearInterval(timer);
  if (!paused && galleryOnScreen && !document.hidden) timer = setInterval(() => selectStory(current + 1), 5500);
}
cards.forEach((card, i) => {
  card.addEventListener('click', () => selectStory(i, true));
  card.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectStory(i + (event.key === 'ArrowRight' ? 1 : -1), true);
      cards[current].focus({preventScroll: true});
    }
  });
});
document.querySelector('#previous-story').addEventListener('click', () => selectStory(current - 1, true));
document.querySelector('#next-story').addEventListener('click', () => selectStory(current + 1, true));
pauseButton.addEventListener('click', () => {paused = !paused; updatePause();});
document.querySelector('.hero-gallery').addEventListener('focusin', () => {paused = true; updatePause();});
document.addEventListener('visibilitychange', updatePause);
reduceMotion.addEventListener('change', () => {paused = reduceMotion.matches; updatePause();});
new IntersectionObserver(entries => {galleryOnScreen = entries[0].isIntersecting; updatePause();}, {threshold:.1}).observe(rail);
window.addEventListener('resize', () => centerCard(false));
window.addEventListener('load', () => centerCard(false));
updatePause();

document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = [...slider.querySelectorAll('.feature-slide')];
  const controls = [...slider.querySelectorAll('.slide-controls button')];
  controls.forEach((button, index) => button.addEventListener('click', () => {
    slides.forEach((slide, i) => {slide.hidden = i !== index; slide.classList.toggle('is-visible', i === index);});
    controls.forEach((control, i) => {control.classList.toggle('selected', i === index); control.setAttribute('aria-pressed', String(i === index));});
  }));
});

const steps = [...document.querySelectorAll('[data-step]')];
const contents = {
  fund: {caption:'ADD MONEY', src:'assets/fund.webp', alt:'Pace’s Add Money screen', height:812},
  hold: {caption:'YOUR PACE WALLET', src:'assets/wallet.webp', alt:'Pace wallet with an illustrative balance and recent activity', height:835},
  send: {caption:'REVIEW YOUR TRANSFER', src:'assets/transfer.webp', alt:'Pace transfer preview showing amount and currency fields', height:812}
};
function showStep(step) {
  steps.forEach(item => {
    const selected = item === step;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  const content = contents[step.dataset.step];
  document.querySelector('#step-panel').setAttribute('aria-labelledby', step.id);
  document.querySelector('#step-caption').textContent = content.caption;
  const screen = document.querySelector('#step-image');
  screen.src = content.src; screen.alt = content.alt; screen.height = content.height;
}
steps.forEach((step,index) => {
  step.addEventListener('click', () => showStep(step));
  step.addEventListener('keydown',event => {
    let next;
    if(event.key==='ArrowDown') next=(index+1)%steps.length;
    if(event.key==='ArrowUp') next=(index+steps.length-1)%steps.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=steps.length-1;
    if(next!==undefined){event.preventDefault();showStep(steps[next]);steps[next].focus();}
  });
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
