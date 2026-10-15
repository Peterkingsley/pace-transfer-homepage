'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mainNav.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  mainNav.classList.toggle('open', !expanded);
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);

const stepContent = {
  fund: { kicker: 'BANK TRANSFER OR STABLECOINS', title: 'Add money.\nYour way.', image: 'assets/fund.webp', alt: 'Pace app screen showing options to add USDT' },
  hold: { kicker: 'SEND WHEN YOU ARE READY', title: 'Your USDT.\nReady to send.', image: 'assets/wallet.webp', alt: 'Pace wallet app with an illustrative USDT balance and transfer history' },
  send: { kicker: 'REVIEW BEFORE YOU SEND', title: 'See the rate.\nThen send.', image: 'assets/transfer.webp', alt: 'Pace transfer screen showing currency selection and an illustrative recipient amount' }
};
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panel = document.querySelector('#step-preview');
const previewTitle = document.querySelector('#preview-title');
previewTitle.style.whiteSpace = 'pre-line';
function selectStep(tab) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    item.classList.toggle('active', active);
  });
  const content = stepContent[tab.dataset.step];
  panel.setAttribute('aria-labelledby', tab.id);
  document.querySelector('#preview-kicker').textContent = content.kicker;
  previewTitle.textContent = content.title;
  const screen = document.querySelector('#preview-screen');
  screen.src = content.image;
  screen.alt = content.alt;
  screen.height = tab.dataset.step === 'hold' ? 835 : 812;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStep(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      tabs[next].focus();
      selectStep(tabs[next]);
    }
  });
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
