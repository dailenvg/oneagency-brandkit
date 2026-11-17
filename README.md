# ONE Agency Brand Kit

The hosted ONE Agency brand kit: guidelines plus every downloadable asset (logos, colour, type, motion, templates,
imagery, copy). Digital only: RGB, px, SVG/PNG/JPG/WebP and web fonts. Version 1.0, 2026-11-17.

One page, ten sections with anchors: `#logo`, `#colour`, `#type`, `#elements`, `#imagery`, `#motion`, `#voice`, `#copy`,
`#ads` (Magnific templates and samples, plus the animated HTML5 ads) and `#assets` (every file, generated from disk,
with per-group and full-kit ZIPs).

## Sources

Everything is derived from the live site, snapshotted on 2026-11-17 into `design/source/`:

| File | Live URL |
| --- | --- |
| `design/source/home.css` | https://oneagency.com/assets/css/home.bundle.css?v=746d4bae1d |
| `design/source/one-agency-logo.svg` | https://oneagency.com/assets/img/one-agency-logo.svg |

To refresh, download the current files over these two and rerun `npm run kit`. Colour values and token names are
copied verbatim; the only computed colours are the tint/shade ramps, labelled "derived, not on the live site" wherever
they appear. Motion follows the film "ONE Agency: The Free Business Audit".

## Stack

Vite 8, React 19, TypeScript, Tailwind CSS 4 (`@tailwindcss/vite`), `motion` (motion/react), Phosphor icons, oxlint,
Playwright (asset rendering). Python 3 with `fonttools` and `brotli` for the font script.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. `.claude/launch.json` runs it on port 5180 (`--strictPort`). |
| `npm run build` | Type-check and production build to `dist/`. |
| `npm run lint` | oxlint (generated bundles in `public/kit/motion` are ignored). |
| `npm run kit` | Regenerates every kit asset below, in order. |
| `npm run kit:tokens` | `scripts/extract-tokens.mjs`: parses the live CSS into `src/data/tokens.ts`, `src/styles/tokens.css` and `public/kit/colour/one-agency_tokens_web.{css,json}` (tokens, usage counts, derived ramps, WCAG contrast table, literal colours). |
| `npm run kit:fonts` | `scripts/fetch-fonts.py`: downloads Geist 400/500/600/700 (vercel/geist-font v1.9.2), Lato 700 and Metal 400 (google/fonts) with their OFL licences. Full TTF + WOFF2 to `public/kit/fonts/`, Latin WOFF2 subsets to `src/assets/fonts/`. |
| `npm run kit:logos` | `scripts/build-logos.mjs`: logo lockups and variants (SVG + PNG @1x/@2x/@4x), favicons, social avatar and OG image to `public/kit/logos/`, plus `src/data/logos.ts`. Add `-- --contact <file.png>` for a review contact sheet. Needs `kit:tokens` first. |
| `npm run kit:motion` | `scripts/build-motion.mjs`: bundles the framework-free motion runtime to `public/kit/motion/one-motion.{js,mjs}`. |
| `npm run kit:elements` | `scripts/build-elements.mjs`: graphic elements as SVG + PNG and the Phosphor ad icons to `public/kit/elements/` (list in `src/data/elements.ts`). |
| `npm run kit:copy` | `scripts/build-copy.mjs`: exports `src/data/copy.ts` to `public/kit/copy/one-agency_copy-bank.{md,json}`. |
| `npm run kit:motion-ads` | `scripts/build-motion-ads.mjs` writes the nine HTML5 ads (3 concepts x 1080x1920, 1080x1080, 300x250) to `public/kit/motion/ads/` plus an HTML5 ZIP each; `scripts/export-motion-ads.mjs` renders them frame by frame (Playwright, `oneAd.seek(t)`) to MP4 (ffmpeg), GIF (300x250 under 3 MB) and an end-frame PNG in `public/kit/motion/exports/`. Without ffmpeg it records WebM instead and skips the GIF. `node scripts/export-motion-ads.mjs --stills` renders end frames only. |
| `npm run kit:zips` | `scripts/build-zips.mjs`: ZIPs every group in `public/kit/` to `public/kit/zips/one-agency_kit_[group].zip` and `one-agency_kit_full.zip`, and writes the asset list `src/data/assets.generated.json`. Rerun it whenever files change (for example after the Magnific export lands). |

## Structure

```
design/source/        live-site snapshots the scripts read
scripts/              asset generators (scripts/lib: shared colour maths)
public/kit/           the downloads, served as-is (see below)
src/
  components/         page sections (*Section.tsx), with their parts in a folder per section
    layout/ ui/       nav, footer, section shell; buttons, filters, toasts, lightbox, empty states
  kit/motion/         motion components + vanilla.ts runtime
  lib/                motion tokens, hooks, kit constants, the ad-manifest and asset loaders
  data/               typed data: generated (tokens.ts, logos.ts, assets.generated.json) and authored (copy.ts,
                      ad-copy.ts, ad-styles.ts, voice.ts, elements.ts, motion-ads.ts, ...)
  styles/             fonts.css, tokens.css (generated)
  assets/fonts/       site font subsets
```

## Downloads: `public/kit/`

| Folder | Contents |
| --- | --- |
| `logos/` | `stacked/`, `horizontal/`, `icon/` (each in `on-dark`, `on-light`, `white`, `ink`), `favicon/`, `social/` |
| `colour/` | `one-agency_tokens_web.css`, `one-agency_tokens_web.json` |
| `fonts/` | Geist, Lato, Metal as TTF + WOFF2, with OFL licence texts |
| `elements/` | gradient bar and line, halo, glow field, dividers, CTA buttons, proof bar, award badge, laurel (SVG + PNG); `icons/` |
| `motion/` | `one-motion.js` (global `OneMotion`), `one-motion.mjs`; `ads/` HTML5 sources; `exports/` MP4, GIF, PNG, HTML5 ZIP |
| `copy/` | the copy bank, Markdown and JSON |
| `templates/`, `imagery/` | written by the Magnific export, with `src/data/ads.generated.json` (not generated here) |
| `zips/` | per-group and full-kit ZIPs (`npm run kit:zips`) |

File names follow `one-agency_[asset]_[variant]_[size].[ext]`, for example
`one-agency_logo_stacked-on-dark_2x.png` or `one-agency_font_geist-700.woff2`. SVGs carry no size segment.

### The Magnific manifest

`src/data/ads.generated.json` is written by the Magnific export, not by this repo. `src/lib/ads.ts` loads it if present
(`import.meta.glob`, so the build works without it), validates every item and skips what does not fit:
`{ brandKitUrl, folderUrl, items: [{ id, group: "template" | "sample" | "imagery", channel, concept, name, width,
height, files: { png?, jpg?, webp? }, magnificUrl, notes }] }`, file paths starting `/kit/`. Until it exists the
Imagery and Ads sections show an empty state with the planned sizes. After it lands: `npm run kit:zips`, then rebuild.

## Motion

Tokens live in `src/lib/motion.ts` (durations, the film's exact easing functions, overshoots, staggers, springs,
variants). React components in `src/kit/motion/` all accept `inView` (play once on scroll, default) and `delay`, and
honour reduced motion: `WordRise`, `LetterHop`, `Pop` (also the logo scale-in), `LineDraw`, `Halo`, `GradientBar`,
`GradientWipe`, `GradientText`.

For HTML5 ads, `one-motion.js` runs the same moves as pure functions of time, so any frame can be rendered exactly:

```html
<p id="line">Marketing that pays for itself.</p>
<script src="one-motion.js"></script>
<script>
  const line = document.getElementById('line')
  // Plays once and holds; under prefers-reduced-motion it shows the final frame.
  const ad = OneMotion.player((t) => OneMotion.rise(line, t, 0.2, { accent: [2] }), { duration: 6 })
  // Frame export: ad.seek(frame / fps)
</script>
```

Accent words get the class `acc`; style it with the `.accent-word` recipe from `src/index.css` (Metal and
`--accent-fill`).
