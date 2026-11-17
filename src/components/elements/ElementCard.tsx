import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { ELEMENTS, elementUrl } from '../../data/elements'
import { assetFor } from '../../lib/assets'
import { reveal } from '../../lib/motion'
import { Badge } from '../ui/Badge'
import { DownloadLink } from '../ui/DownloadLink'
import { ReplayButton } from '../ui/ReplayButton'

interface ElementCardProps {
  /** Element ids from src/data/elements.ts whose files this card offers. */
  ids: string[]
  /** Card title; defaults to the first element's. */
  title?: string
  /** Live render. Re-mounted on replay when `replayable`. Omit for a files-only card. */
  children?: ReactNode
  replayable?: boolean
  /** Classes for the stage (height, ground, padding). */
  stage?: string
  className?: string
  /** Heading level: 3 when the card sits straight under the section h2, 4 (default) under a SubHeading h3. */
  level?: 3 | 4
}

const SOURCE_BADGE = {
  live: <Badge tone="live">Live site</Badge>,
  film: <Badge tone="derived">Film</Badge>,
  proposed: <Badge tone="proposed">Proposed</Badge>,
}

/** A graphic element: live render on a stage, what it is for, and SVG/PNG downloads. */
export function ElementCard({ ids, title, children, replayable, stage = 'h-56 bg-ground p-8', className, level = 4 }: ElementCardProps) {
  const [run, setRun] = useState(0)
  const Heading = level === 3 ? 'h3' : 'h4'
  const items = ids.map((id) => ELEMENTS.find((e) => e.id === id)!)
  const [first] = items

  return (
    <motion.article variants={reveal} className={`flex flex-col overflow-hidden rounded-site border border-edge bg-surface ${className ?? ''}`}>
      {children && (
        <div key={run} className={`relative grid place-items-center overflow-hidden ${stage}`}>
          {children}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <Heading className="font-semibold text-text">{title ?? first.title}</Heading>
          {SOURCE_BADGE[first.source]}
        </header>
        <p className="text-step-small text-text-2">{first.use}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {items.flatMap((item) =>
            (['svg', 'png'] as const).map((ext) => {
              const url = elementUrl(item.base, ext)
              return <DownloadLink key={url} url={url} label={`${items.length > 1 ? `${item.title} ` : ''}${ext.toUpperCase()}`} bytes={assetFor(url)?.bytes} />
            }),
          )}
          {replayable && <ReplayButton onClick={() => setRun((n) => n + 1)} label={title ?? first.title} />}
        </div>
      </div>
    </motion.article>
  )
}
