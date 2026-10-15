# Pace Transfer homepage

A responsive, buildless homepage inspired by Morse Money's layout, retaining Pace's logo and lime green. Includes an expanding photo gallery, alternating product stories, an interactive product walkthrough, FAQs and an app download QR code.

The copy now leads with everyday motivations, connection and choice: “Money for the life you’re building.” It uses original Pace wording inspired by Morse's warm, direct voice, while keeping Pace's existing product facts.

## Preview

From this directory run:

```powershell
python -m http.server 4175 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4175. No installation or build step is required.

## Source

- `dist/index.html`: page content and destination links.
- `dist/morse.css`: responsive layout, original Pace branding and reduced-motion support.
- `dist/morse.js`: gallery controls, photo selection and accessible walkthrough tabs.
- `dist/assets/editorial/`: seven optimized generated photographs.
- Original generated PNGs are retained in the local project's `research/generated-originals/` and in the full downloadable project archive. The repository uses optimized WebP assets.
- `IMAGE-PROMPTS.md`: exact prompts, screen references and asset mapping.
- `preview-desktop.jpg` and `preview-mobile.jpg`: full-page screenshots.

Upload the contents of `dist` to a static host. Images and fonts are local; the page has no third-party runtime dependencies.

## Content and assets

Logo, Matter SemiBold font and product screens come from the supplied ZIP archives. The favicon comes from the public Pace site. Morse Money informed the page structure; its photographs, testimonials and product claims were not reused.

All seven editorial photographs were generated sequentially using the built-in image-generation tool. The three visible phone interfaces use supplied Pace screens as generation references. Exact source screens also appear in the transfer preview and walkthrough. The fictional people illustrate use cases and are not presented as actual customers or endorsers. Phone balances and rates are examples.

The download link, legal destinations, support email, social links and feature descriptions were checked against https://pacetrf.com/ during this rebuild. The homepage directs users to the app for current destinations, rates and funding options. It does not perform payments or fetch live exchange rates.

## Validation and hosting

See `VERIFICATION.md`. The site has passed desktop and mobile checks. The `main` branch holds the source; `dist/` contains the deployable website. A `gh-pages` branch can publish just that directory through GitHub Pages. The original pacetrf.com domain is separate from this redesign.

To update the Pages branch after committing changes:

```sh
git push origin main
git subtree split --prefix dist -b pages-update
git push origin pages-update:gh-pages
git branch -D pages-update
```
