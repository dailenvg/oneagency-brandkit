import { MagnifyingGlassPlus } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { displaySrc, type AdItem } from '../../lib/ads'
import { formatSize } from '../../lib/format'
import { pressCard, reveal } from '../../lib/motion'
import { AdFileLinks } from '../ads/AdFileLinks'
import { SmartImage } from '../ui/SmartImage'

/** A starter-library image: opens larger on click, with its files. */
export function ImageryCard({ item, onOpen }: { item: AdItem; onOpen: () => void }) {
  const src = displaySrc(item.files)!
  return (
    <motion.li variants={reveal} className="flex flex-col overflow-hidden rounded-site border border-edge bg-surface">
      {/* The view button is an overlay (not a wrapper) so it never nests with the image's own Retry button; the aspect
          ratio keeps the skeleton and the error state at the image's size. */}
      <SmartImage
        src={src}
        alt={item.notes ?? item.name}
        width={item.width}
        height={item.height}
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
        className="w-full bg-surface-2"
        imgClassName="size-full object-cover"
        overlay={
          <motion.button
            type="button"
            onClick={onOpen}
            aria-label={`View ${item.name} larger`}
            className="group absolute inset-0 cursor-zoom-in focus-visible:-outline-offset-4"
            whileTap={pressCard.whileTap}
          >
            <span
              className="absolute right-3 bottom-3 grid size-touch place-items-center rounded-full bg-void/70 text-text opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
              aria-hidden
            >
              <MagnifyingGlassPlus className="size-5" />
            </span>
          </motion.button>
        }
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p>
          <span className="block font-semibold text-text">{item.name}</span>
          <span className="font-num text-step-small text-text-3">{formatSize(item.width, item.height)}</span>
        </p>
        {item.notes && <p className="text-step-small text-text-2">{item.notes}</p>}
        <div className="mt-auto">
          <AdFileLinks item={item} />
        </div>
      </div>
    </motion.li>
  )
}
