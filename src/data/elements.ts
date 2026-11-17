/**
 * Graphic elements and the ad icon subset. scripts/build-elements.mjs imports this file to write the downloads to
 * public/kit/elements/, so it stays import-free.
 */

export const ELEMENTS_DIR = '/kit/elements'

export interface ElementFile {
  id: string
  /** File base name without extension; every element ships as .svg and .png (2x). */
  base: string
  title: string
  source: 'live' | 'film' | 'proposed'
  use: string
}

const el = (id: string, title: string, source: ElementFile['source'], use: string): ElementFile => ({
  id,
  base: `one-agency_element_${id}`,
  title,
  source,
  use,
})

export const ELEMENTS: ElementFile[] = [
  el('gradient-bar', 'Gradient bar', 'live', 'The --bar rule: under the logo, at the top of cards, as the one accent in an ad.'),
  el('gradient-line', 'Gradient line', 'film', 'Connects steps and always ends on a result dot. Moves left to right and upward.'),
  el('halo', 'Halo', 'film', 'Soft lilac glow behind the logo or a hero number. One per frame.'),
  el('glow-field', 'Glow field', 'live', "The site's hero ground: rose glow top left, blue glow bottom right, on night-navy."),
  el('divider-hairline', 'Hairline divider', 'live', '--v2-hairline: a 1px rose-to-blue rule that fades at both ends, between sections.'),
  el('divider-lit-edge', 'Lit edge', 'live', '--v2-lit-edge: the lit top edge of a featured card.'),
  el('divider-stat', 'Stat divider, vertical', 'live', '--stat-divider: between stats in a row.'),
  el('divider-stat-h', 'Stat divider, horizontal', 'live', '--stat-divider-h: between stacked stats.'),
  el('cta-primary', 'CTA, primary', 'live', 'Rose pill, navy text. One per ad.'),
  el('cta-secondary', 'CTA, secondary', 'live', 'White outline pill for a second, quieter action on dark.'),
  el('cta-on-light', 'CTA, on light', 'proposed', 'Ink pill for paper grounds, where rose fails contrast.'),
  el('stat-bar', 'Proof bar', 'live', 'Lato numbers in the gradient, white labels, gradient dividers, the source line underneath.'),
  el('award-badge', 'Award badge', 'live', 'Always says it was awarded to ConversionIQ.ai.'),
  el('laurel', 'Laurel', 'live', 'The award laurel from the live banner, white.'),
]

export const elementUrl = (base: string, ext: 'svg' | 'png') => `${ELEMENTS_DIR}/${base}.${ext}`

export interface AdIcon {
  /** Phosphor component name (bold weight). */
  name: string
  file: string
  use: string
}

const icon = (name: string, file: string, use: string): AdIcon => ({ name, file, use })

/** The Phosphor bold subset used in ads. */
export const AD_ICONS: AdIcon[] = [
  icon('ArrowRight', 'arrow-right', 'Inside CTAs'),
  icon('ArrowUpRight', 'arrow-up-right', 'Outbound links'),
  icon('Phone', 'phone', 'Call lines'),
  icon('ChatCircleDots', 'chat-circle-dots', 'Answering the lead'),
  icon('MagnifyingGlass', 'magnifying-glass', 'Audits, search'),
  icon('ChartLineUp', 'chart-line-up', 'Results'),
  icon('Clock', 'clock', '5-minute audit'),
  icon('CheckCircle', 'check-circle', 'Audit checklist items'),
  icon('Trophy', 'trophy', 'Awards'),
  icon('Target', 'target', 'Qualified leads'),
  icon('Users', 'users', 'Customers, teams'),
  icon('CalendarCheck', 'calendar-check', 'Tours, bookings'),
  icon('Storefront', 'storefront', 'E-commerce, retail'),
  icon('Megaphone', 'megaphone', 'Paid media'),
  icon('EnvelopeSimple', 'envelope-simple', 'Email'),
  icon('Globe', 'globe', 'AI search, web'),
  icon('ShieldCheck', 'shield-check', 'Compliance (ConversionIQ.ai)'),
]

export const iconUrl = (file: string) => `${ELEMENTS_DIR}/icons/one-agency_icon_${file}.svg`
