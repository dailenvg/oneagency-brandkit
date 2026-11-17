/** Page sections in order: anchors, nav labels and the scroll-spy list. */
export const SECTIONS = [
  { id: 'logo', label: 'Logo' },
  { id: 'colour', label: 'Colour' },
  { id: 'type', label: 'Type' },
  { id: 'elements', label: 'Elements' },
  { id: 'imagery', label: 'Imagery' },
  { id: 'motion', label: 'Motion' },
  { id: 'voice', label: 'Voice' },
  { id: 'copy', label: 'Copy' },
  { id: 'ads', label: 'Ads' },
  { id: 'assets', label: 'Assets' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const SECTION_IDS: string[] = SECTIONS.map((s) => s.id)
