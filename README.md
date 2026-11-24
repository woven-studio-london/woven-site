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
