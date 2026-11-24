# woven-site

The Woven Studio landing page: a single self-contained page (`index.html`) plus four photos.
No build step, no dependencies. Fonts (Albert Sans, Federo) load from Google Fonts.

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

## Still to fill

- LinkedIn and X handles (footer, marked `[handle]`).
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
