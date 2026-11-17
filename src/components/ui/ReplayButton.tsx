import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { press } from '../../lib/motion'

/** Replays a motion demo. `label` names what replays, for screen readers. */
export function ReplayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Replay ${label}`}
      className="inline-flex min-h-touch items-center gap-1.5 rounded-full border border-edge bg-surface px-3.5 text-step-small font-semibold text-text transition-colors hover:border-rose hover:text-rose active:bg-surface-2"
      {...press}
    >
      <ArrowCounterClockwise className="size-4" aria-hidden />
      Replay
    </motion.button>
  )
}
