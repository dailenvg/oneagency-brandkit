/**
 * Kit-wide constants shared by the site and the Node scripts (scripts/*.mjs import this file directly, so it stays
 * import-free and uses erasable TypeScript only).
 */

export const KIT = {
  version: '1.0',
  updated: '2026-11-17',
  site: 'https://oneagency.com',
  liveCss: 'https://oneagency.com/assets/css/home.bundle.css?v=746d4bae1d',
  liveCssPulled: '2026-11-17',
} as const

export const VERSION_NOTE = `Brand kit v${KIT.version} · Updated ${KIT.updated}`

/** Download groups: each is a folder under public/kit/ and gets its own ZIP. Order is the filter order on the site. */
export const ASSET_GROUPS = [
  { id: 'logos', label: 'Logos' },
  { id: 'colour', label: 'Colour' },
  { id: 'fonts', label: 'Fonts' },
  { id: 'elements', label: 'Elements' },
  { id: 'templates', label: 'Templates' },
  { id: 'imagery', label: 'Imagery' },
  { id: 'motion', label: 'Motion' },
  { id: 'copy', label: 'Copy' },
] as const

export type AssetGroupId = (typeof ASSET_GROUPS)[number]['id']

export const zipUrl = (group: AssetGroupId) => `/kit/zips/one-agency_kit_${group}.zip`

export const FULL_KIT_URL = '/kit/zips/one-agency_kit_full.zip'

/** Google Fonts pages for the three faces the live site loads (all SIL Open Font License 1.1). */
export const FONT_PAGES = {
  geist: 'https://fonts.google.com/specimen/Geist',
  lato: 'https://fonts.google.com/specimen/Lato',
  metal: 'https://fonts.google.com/specimen/Metal',
} as const
