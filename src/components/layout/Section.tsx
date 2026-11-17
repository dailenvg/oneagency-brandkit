import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { WordRise } from '../../kit/motion/WordRise'
import { reveal, viewport } from '../../lib/motion'

interface SectionProps {
  id: string
  /** Two-digit index shown in the eyebrow. */
  index: string
  eyebrow: string
  title: string
  /** Word indices of the title set as accent words. */
  accent?: number[]
  lede?: ReactNode
  /** Right-hand header slot: downloads, toggles. */
  actions?: ReactNode
  children: ReactNode
  /** Alternate band background, as the live site alternates sections. */
  band?: boolean
}

/** Section shell: anchor, numbered eyebrow, word-rise title, lede and actions, then content. */
export function Section({ id, index, eyebrow, title, accent, lede, actions, children, band }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-section ${band ? 'bg-band/50' : ''}`}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'var(--v2-hairline)' }} />
      <div className="container-site">
        <header className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.p className="eyebrow mb-4" variants={reveal} initial="hidden" whileInView="show" viewport={viewport}>
              <span className="font-num text-text-3">{index}</span> · {eyebrow}
            </motion.p>
            <WordRise as="h2" id={headingId} text={title} accent={accent} className="text-step-4 font-bold leading-display tracking-tight text-balance" />
            {lede && (
              <motion.div className="mt-5 max-w-2xl text-step-1 leading-relaxed text-text-2" variants={reveal} initial="hidden" whileInView="show" viewport={viewport}>
                {lede}
              </motion.div>
            )}
          </div>
          {actions && (
            <motion.div className="flex flex-wrap gap-3" variants={reveal} initial="hidden" whileInView="show" viewport={viewport}>
              {actions}
            </motion.div>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
