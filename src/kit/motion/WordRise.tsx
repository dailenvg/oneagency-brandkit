import { motion, useReducedMotion } from 'motion/react'
import { Fragment } from 'react'
import { fade, sequence, stagger, wordRise } from '../../lib/motion'
import { textTags, trigger, type MotionTriggerProps, type TextTag } from './trigger'

interface WordRiseProps extends MotionTriggerProps {
  text: string
  /** Word indices set as accent words (Metal, signature gradient). */
  accent?: number[]
  as?: TextTag
  className?: string
  /** Seconds between words. Default 0.07. */
  step?: number
  id?: string
}

/** Word rise: each word blurs and rises into place, left to right. Reduced motion: the line is there from the first frame. */
export function WordRise({ text, accent = [], as = 'p', className, inView = true, delay = 0, step = stagger.word, id }: WordRiseProps) {
  const reduced = useReducedMotion()
  const Tag = textTags[as]
  const words = text.trim().split(/\s+/)

  return (
    <Tag id={id} className={className} variants={reduced ? sequence(0) : sequence(step, delay)} {...trigger(inView, !!reduced)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span aria-hidden className="inline-block" variants={reduced ? fade : wordRise}>
            {accent.includes(i) ? <span className="accent-word">{word}</span> : word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}
