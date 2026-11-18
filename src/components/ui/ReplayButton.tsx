import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { press } from '../../lib/motion'
import { buttonClass } from './button-styles'

/** Replays a motion demo. `label` names what replays, for screen readers. */
export function ReplayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Replay ${label}`}
      className={buttonClass('quiet', 'sm')}
      {...press}
    >
      <ArrowCounterClockwise aria-hidden />
      Replay
    </motion.button>
  )
}
