import { DownloadSimple } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { press } from '../../lib/motion'
import { fileName, formatBytes } from '../../lib/format'

interface DownloadLinkProps {
  url: string
  /** Short visible label, e.g. "SVG" or "PNG 2x". */
  label: string
  bytes?: number | null
  className?: string
}

/** Per-file download chip. The accessible name carries the visible label, the size and the full file name. */
export function DownloadLink({ url, label, bytes, className }: DownloadLinkProps) {
  return (
    <motion.a
      href={url}
      download
      // Visible label first (WCAG 2.5.3 label in name), then the exact file and size.
      aria-label={`${label}${bytes ? ` ${formatBytes(bytes)}` : ''}, download ${fileName(url)}`}
      className={`inline-flex min-h-touch items-center gap-1.5 rounded-full border border-edge bg-surface px-3.5 text-step-small font-semibold text-text transition-colors hover:border-rose hover:text-rose active:bg-surface-2 ${className ?? ''}`}
      {...press}
    >
      <DownloadSimple className="size-4 shrink-0" aria-hidden />
      {label}
      {bytes ? <span className="font-normal text-text-3">{formatBytes(bytes)}</span> : null}
    </motion.a>
  )
}
