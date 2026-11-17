import { ArrowUpRight, FilmSlate } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { motionAdExport, motionAdSource, type MotionAdConcept, type MotionAdSize } from '../../data/motion-ads'
import { assetFor } from '../../lib/assets'
import { formatSeconds } from '../../lib/format'
import { useOnScreen } from '../../lib/hooks'
import { DownloadLink } from '../ui/DownloadLink'

interface MotionAdCardProps {
  concept: MotionAdConcept
  size: MotionAdSize
  name: string
}

/** Display width per format: the banner at true size, the 1080s scaled to sit side by side. */
const DISPLAY_WIDTH: Record<string, number> = { '1080x1920': 270, '1080x1080': 360, '300x250': 300 }

/**
 * One exported motion ad: plays once (muted, only when on screen and motion is allowed) and holds on the end frame,
 * which is also the poster. Missing exports show a rebuild hint.
 */
export function MotionAdCard({ concept, size, name }: MotionAdCardProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const onScreen = useOnScreen(ref)
  const played = useRef(false)

  const video = assetFor(motionAdExport(concept, size, 'mp4')) ?? assetFor(motionAdExport(concept, size, 'webm'))
  const poster = motionAdExport(concept, size, 'png')
  const files = (['mp4', 'webm', 'gif', 'png', 'zip'] as const).map((ext) => ({ ext, file: assetFor(motionAdExport(concept, size, ext)) })).filter((f) => f.file)
  const dims = `${size.width}x${size.height}`
  const width = DISPLAY_WIDTH[dims]

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !onScreen || played.current) return
    played.current = true
    el.play().catch(() => {})
  }, [onScreen, reduced])

  return (
    <figure className="flex max-w-full flex-col gap-3" style={{ width: Math.min(width, size.width) }}>
      <div className="overflow-hidden rounded-site-sm border border-edge bg-void" style={{ aspectRatio: `${size.width} / ${size.height}` }}>
        {video ? (
          <video ref={ref} src={video.url} poster={poster} controls muted playsInline preload="metadata" className="size-full" aria-label={`${name}, ${dims}, animated, no sound`} />
        ) : (
          <div className="grid size-full place-items-center p-4 text-center text-step-small text-text-3">
            <span className="flex flex-col items-center gap-2">
              <FilmSlate className="size-6" aria-hidden />
              Not exported yet. Run <code className="font-mono text-text-2">npm run kit:motion-ads</code>.
            </span>
          </div>
        )}
      </div>
      <figcaption className="flex flex-col gap-2">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-num font-semibold text-text">{size.width}×{size.height}</span>
          {video?.duration ? <span className="font-num text-step-small text-text-3">{formatSeconds(video.duration)}</span> : null}
        </p>
        <div className="flex flex-wrap gap-2">
          {files.map(({ ext, file }) => (
            <DownloadLink key={ext} url={file!.url} label={ext === 'zip' ? 'HTML5' : ext.toUpperCase()} bytes={file!.bytes} />
          ))}
          <a
            href={motionAdSource(concept, size)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live: the ${dims} HTML5 ad (opens in a new tab)`}
            className="inline-flex min-h-touch items-center gap-1.5 rounded-full px-3 text-step-small font-semibold text-rose hover:bg-surface-2 hover:text-text"
          >
            Open live <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </figcaption>
    </figure>
  )
}
