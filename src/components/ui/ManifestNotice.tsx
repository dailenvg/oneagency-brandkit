import { FileDashed, WarningCircle } from '@phosphor-icons/react'
import { AD_MANIFEST } from '../../lib/ads'
import { EmptyState } from './EmptyState'

interface ManifestNoticeProps {
  /** What is missing, e.g. "ad templates". */
  what: string
  /** Shown when the manifest is fine but has nothing for this view. */
  emptyHint?: string
}

const RECOVER = (
  <p className="text-step-small text-text-3">
    When the Magnific export lands in <code className="font-mono text-text-2">src/data/ads.generated.json</code>, run <code className="font-mono text-text-2">npm run kit:zips</code> and
    rebuild.
  </p>
)

/** Empty or error state for anything driven by the Magnific manifest. */
export function ManifestNotice({ what, emptyHint }: ManifestNoticeProps) {
  if (AD_MANIFEST.status === 'invalid') {
    return (
      <EmptyState icon={WarningCircle} tone="error" title={`The ${what} could not be read`} action={RECOVER}>
        {AD_MANIFEST.reason} Check the file against the expected shape: brandKitUrl, folderUrl and an items list.
      </EmptyState>
    )
  }
  return (
    <EmptyState icon={FileDashed} title={`The ${what} are on the way`} action={RECOVER}>
      {AD_MANIFEST.status === 'missing' ? `The ${what} are being made in Magnific and appear here automatically once the manifest is published.` : (emptyHint ?? `The manifest lists no ${what} yet.`)}
    </EmptyState>
  )
}
