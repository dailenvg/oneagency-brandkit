import { ArrowUpRight } from '@phosphor-icons/react'
import { fileList, type AdItem } from '../../lib/ads'
import { assetFor } from '../../lib/assets'
import { DownloadLink } from '../ui/DownloadLink'

/** Per-format downloads for a manifest item, plus "Edit in Magnific" when the item has a design link. */
export function AdFileLinks({ item }: { item: AdItem }) {
  return (
    <div className="flex flex-wrap gap-2">
      {fileList(item.files).map((f) => (
        <DownloadLink key={f.url} url={f.url} label={f.format} bytes={assetFor(f.url)?.bytes} />
      ))}
      {item.magnificUrl && (
        <a
          href={item.magnificUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Edit in Magnific: ${item.name} (opens in a new tab)`}
          className="inline-flex min-h-touch items-center gap-1.5 rounded-full px-3.5 text-step-small font-semibold text-rose transition-colors hover:bg-surface-2 hover:text-text"
        >
          Edit in Magnific <ArrowUpRight className="size-4" aria-hidden />
        </a>
      )}
    </div>
  )
}
