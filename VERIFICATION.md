# Verification — 15 October 2026

- Local HTTP preview returned 200.
- JavaScript syntax check passed.
- Chrome checks passed at viewport widths 1440, 768, 390 and 320 px, with no page-level horizontal overflow.
- Gallery previous/next buttons and keyboard navigation work.
- All three feature image selectors work.
- Walkthrough selection works with clicks and ArrowDown/Home keyboard navigation.
- FAQ opening works with native details elements.
- All visible images loaded, including images initially deferred by lazy loading.
- Seven app-download links point to `https://onelink.to/vkuuyp`.
- No browser page errors or HTTP errors during the test.
- Desktop and mobile screenshots were reviewed. The transfer-preview crop was adjusted to show both amount fields, and the initial wallet gallery image was centered.
- After the copy refresh, the responsive and interaction checks passed again. Updated screenshots and this archive include the warmer homepage wording.
- The rate section heading now reads “Spend at real exchange rate, every time.” Its transfer preview uses a responsive route grid and remains contained at 320 px, 390 px, 768 px and desktop widths.
- Reduced-motion behavior was checked in browser testing. Source inspection confirms gallery focus or manual selection pauses autoplay, with a play control to resume it.

Automated browser checks: `research/qa/check.cjs`; results: `research/qa/results.json`. Chrome ran in an isolated headless test session because the desktop automation helper was unavailable. Full-page screenshots eagerly loaded images for capture; production images retain lazy loading.

Payment processing, live rates and store installation flows are outside this marketing homepage.

## Public deployment

Published at https://peterkingsley.github.io/pace-transfer-homepage/ from the `gh-pages` branch. GitHub reported the deployment built successfully. An unauthenticated Chrome session verified HTTP 200, the latest homepage copy, all images loading, gallery navigation, walkthrough selection and the app-download destination, with no page or HTTP errors. The source repository is public at https://github.com/Peterkingsley/pace-transfer-homepage.
