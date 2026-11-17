#!/usr/bin/env node
/**
 * Builds the download ZIPs and the asset list from whatever is in public/kit/ right now, so it can be re-run any time
 * (for example after the Magnific templates and imagery land):
 *   public/kit/zips/one-agency_kit_[group].zip   one per group with files (logos, colour, fonts, elements, templates,
 *                                                imagery, motion, copy)
 *   public/kit/zips/one-agency_kit_full.zip      everything, under one-agency_kit/
 *   src/data/assets.generated.json              every listed file with format, dimensions, size and preview
 *
 * The HTML5 ad source folders (motion/ads/) go into the ZIPs but are not listed one by one: each ad is listed as its
 * package, motion/exports/one-agency_motion-[concept]_[WxH].zip.
 *
 * Usage: node scripts/build-zips.mjs   (npm run kit:zips)
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mediaInfo } from './lib/media-info.mjs'
import { zipFiles } from './lib/zip.mjs'
import { ASSET_GROUPS, FULL_KIT_URL, KIT, VERSION_NOTE, zipUrl } from '../src/lib/kit.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = resolve(ROOT, 'public')
const KIT_DIR = resolve(PUBLIC, 'kit')
const ZIPS = resolve(KIT_DIR, 'zips')
const MANIFEST = resolve(ROOT, 'src/data/assets.generated.json')

const IMAGE = /\.(png|jpe?g|webp|gif|svg)$/i
const VIDEO = /\.(mp4|webm)$/i
const UNLISTED = /^motion\/ads\//

const README = `ONE Agency brand kit
${VERSION_NOTE}

Digital only: RGB colour, px sizes, SVG/PNG/JPG/WebP, web fonts, MP4/GIF and HTML5.
File names follow one-agency_[asset]_[variant]_[size].[ext].

Folders
  logos/      stacked, horizontal and icon lockups (on dark, on light, white, ink), favicons, social images
  colour/     the live site's colour tokens as CSS and JSON
  fonts/      Geist, Lato and Metal (TTF and WOFF2) with their licences
  elements/   gradient bar and line, halo, glow field, dividers, CTA buttons, proof bar, award badge, icons
  templates/  ad templates and sample ads (editable versions live in Magnific)
  imagery/    starter image library
  motion/     one-motion.js (the motion runtime), HTML5 ad sources, and exports (MP4, GIF, end frames, HTML5 ZIPs)
  copy/       the copy bank (Markdown and JSON)

Licences
  Geist, Lato and Metal are under the SIL Open Font License 1.1 (see fonts/*_ofl.txt).
  Logos and all other brand assets belong to ONE Agency, LLC. Use them only for ONE Agency work.
  The 2026 ARDY Award belongs to ConversionIQ.ai; say so wherever it appears.

Sources
  Colour: ${KIT.liveCss} (pulled ${KIT.liveCssPulled})
  Logo: ${KIT.site}/assets/img/one-agency-logo.svg
  Proof figures 10M+, $100M+, 7B+, 450K+: as published on oneagency.com, November 2026.
`

/** Every file under a directory, as paths relative to public/kit with forward slashes. Dotfiles are skipped. */
function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    if (d.name.startsWith('.')) return []
    const path = resolve(dir, d.name)
    return d.isDirectory() ? walk(path) : [relative(KIT_DIR, path).split(sep).join('/')]
  })
}

function previewFor(rel, files) {
  if (IMAGE.test(rel)) return `/kit/${rel}`
  if (VIDEO.test(rel)) {
    const poster = rel.replace(VIDEO, '.png')
    return files.includes(poster) ? `/kit/${poster}` : null
  }
  return null
}

function entry(rel, group, files) {
  const path = resolve(KIT_DIR, rel)
  const buf = readFileSync(path)
  const name = rel.slice(rel.lastIndexOf('/') + 1)
  return {
    url: `/kit/${rel}`,
    name,
    group,
    format: name.slice(name.lastIndexOf('.') + 1).toUpperCase(),
    bytes: buf.length,
    ...mediaInfo(path, buf),
    preview: previewFor(rel, files),
  }
}

const zipEntries = (rels, prefix = '') => [
  { name: `${prefix}README.txt`, data: Buffer.from(README) },
  ...rels.map((rel) => ({ name: `${prefix}${rel}`, data: readFileSync(resolve(KIT_DIR, rel)) })),
]

rmSync(ZIPS, { recursive: true, force: true })
mkdirSync(ZIPS, { recursive: true })

const groups = []
const listed = []
const everything = []
for (const g of ASSET_GROUPS) {
  const rels = walk(resolve(KIT_DIR, g.id)).sort()
  everything.push(...rels)
  const shown = rels.filter((rel) => !UNLISTED.test(rel))
  listed.push(...shown.map((rel) => entry(rel, g.id, rels)))
  let zip = null
  if (rels.length) {
    const data = zipFiles(zipEntries(rels))
    writeFileSync(resolve(PUBLIC, zipUrl(g.id).slice(1)), data)
    zip = { url: zipUrl(g.id), bytes: data.length, files: rels.length }
  }
  groups.push({ id: g.id, label: g.label, count: shown.length, bytes: shown.reduce((n, rel) => n + statSync(resolve(KIT_DIR, rel)).size, 0), zip })
}

const full = zipFiles(zipEntries(everything, 'one-agency_kit/'))
writeFileSync(resolve(PUBLIC, FULL_KIT_URL.slice(1)), full)

const manifest = {
  generatedAt: new Date().toISOString(),
  version: VERSION_NOTE,
  groups,
  full: { url: FULL_KIT_URL, bytes: full.length, files: everything.length },
  files: listed,
}
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`
for (const g of groups) console.log(`${g.id.padEnd(10)} ${String(g.count).padStart(4)} listed  ${g.zip ? `${mb(g.zip.bytes).padStart(8)} ZIP (${g.zip.files} files)` : '  (empty, no ZIP)'}`)
console.log(`full kit   ${mb(full.length)} (${everything.length} files) · ${listed.length} files listed in src/data/assets.generated.json`)
