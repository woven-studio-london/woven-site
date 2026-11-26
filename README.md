# woven-site

The Woven Studio landing page: one page (`index.html`), four photos and a vendored copy of the
Woven Studio design system in `ds/`. No build step and no third-party requests: the fonts are
self-hosted.

## Design system

`ds/` is the web layer of the Woven Studio design system, copied from the design system artifact
(<https://claude.ai/artifact/VeEY75BVz6RjgBWxk3BX95>, version `1795530811-8da3`):

| File | What it is |
|---|---|
| `ds/tokens.json` | The tokens, unchanged. |
| `ds/tokens.css` | CSS custom properties and `@font-face` rules generated from `tokens.json`. Regenerate it, don't edit it. |
| `ds/bundle.css` | The `n-` component classes, unchanged except that the Google Fonts `@import` is removed. |
| `ds/fonts/` | Albert Sans (variable) and Federo, with their SIL OFL licences in `ds/licenses/`. |

The page takes every colour, font, space and radius from these tokens, and uses the system's
components where one exists: `.n-display` for Federo (tagline, nav wordmark, footer lockup),
`.n-deco-rule`, `.n-mark` for the Crown, `.n-btn`, `.n-badge` and `.n-on-navy` on the navy
sections. Page-specific layout (the hero medallion, the showreel, the How we work diagram) is
written in `index.html` on top of the tokens.

Where the page departs from the design system (the oversized left-aligned tagline, the
medallion behind it, Federo three times, the mark drawn and highlighted as a diagram, the navy
nav and footer, the showreel's decorative colour, the photo cards), it does so under the approved
marketing-page exceptions in HQ's ADR 0005 (`woven-studio/docs/decisions/0005-marketing-page-exceptions.md`).

To update the system: copy the new `tokens.json`, `components/bundle.css` and `fonts/` from the
artifact, drop the `@import` line from `bundle.css`, and regenerate `tokens.css`.

## Preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Sections

1. Hero: the tagline in Federo over an animated Art Deco medallion.
2. Showreel: full screen, a placeholder until the reel is cut. Swap `.reel-ph` for the `<video>` noted in the markup.
3. Featured products: JTBF and three "In the studio" placeholders.
4. How we work: the Crown as a diagram. The weft is our three principles, the warps our five disciplines.
5. Footer: contact and the studio lockup.

Colours and type follow the Woven Studio design system (`@woven-studio-london/tokens`).

## JTBF landing page

`jtbf/index.html` (English) and `jtbf/zh-hant/index.html` (Traditional Chinese) share `jtbf/jtbf.css` and
`jtbf/waitlist.js`, and use the same `ds/` tokens and `n-` components as the studio page, under ADR 0005.
Edit both pages together: the copy differs, the markup should not.
When you change `jtbf.css` or `waitlist.js`, bump the `?v=` on their links in both pages so browsers fetch the new file.

- **Waitlist:** a Kit (kit.com) form. Each page's form `action` holds the placeholder `KIT_FORM_ID`: replace it
  with the Kit form's ID in both files. A hidden `fields[language]` input (`en` or `zh-hant`) fills the Kit custom
  field `language`. Without JavaScript the form posts straight to Kit; with it, `waitlist.js` submits in place,
  shows the thank-you (double opt-in: "check your inbox") and counts a GoatCounter event `jtbf-waitlist-signup`.
  While the placeholder is in place, the form says the waitlist isn't open yet and sends nothing.
- **Icon:** `jtbf/icon.svg` is `assets/icon.svg` from `woven-jtbf` (main); `apple-touch-icon.png` is its PNG at 180 px.
  `og.png` (1200 x 630) is rendered from the hero's motif and the icon.
- **App screens:** `jtbf/shots/step-1..4.jpg`, real screens from the JTBF app on its sample roles (made-up companies),
  taken on a simulator and cropped below the status bar to 540 px wide. Both pages use the English screens for
  now; when the app has a Traditional Chinese version, take Chinese screens for `zh-hant` (Morris, 2026-11-26).
- **Before launch:** no prices and no exact launch date in public: "January 2027" / 「2027 年 1 月」 (Morris, 2026-11-26).
- **Screenshots:** none yet. The spot for real simulator screenshots is marked in a comment in the How it works section.

## Icons

`favicon.svg` is the Crown in one ink (brand-navy, white in dark mode), as `docs/studio/brand.md` asks for favicons. `apple-touch-icon.png` (180 × 180) is the reversed Crown on brand-navy, for home-screen bookmarks.

## Still to fill

- The showreel video.
- The three "In the studio" product cards.
- JTBF's icon is copied from `woven-jtbf` branch `jtbf/app-icon`; update it here if it changes.

## Photo credits

All four photos are from Unsplash, free to use under the [Unsplash License](https://unsplash.com/license) (no attribution required).

| File | Photographer | Source |
|---|---|---|
| `photos/jtbf-commute.jpg` | @_rxshxxd | <https://unsplash.com/photos/oqY09oVTa3k> |
| `photos/cafe.jpg` | @airamdphoto | <https://unsplash.com/photos/T90gWliuCQQ> |
| `photos/table.jpg` | Brooke Cagle | <https://unsplash.com/photos/QDrn4DEx1kA> |
| `photos/home.jpg` | Darya Ezerskaya | <https://unsplash.com/photos/hgz7pZkQoQc> |
