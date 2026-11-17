import type { ReactNode } from 'react'

type Tone = 'neutral' | 'proposed' | 'derived' | 'live'

const TONES: Record<Tone, string> = {
  neutral: 'border-edge bg-void/85 text-text-2',
  proposed: 'border-pos/50 bg-void/85 text-pos',
  derived: 'border-lilac/50 bg-void/85 text-lilac',
  live: 'border-rose/50 bg-void/85 text-rose',
}

/** Status label: Proposed, Derived, Live site. */
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-step-small font-semibold ${TONES[tone]}`}>{children}</span>
}
