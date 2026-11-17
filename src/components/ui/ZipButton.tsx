import { DownloadSimple } from '@phosphor-icons/react'
import { assetFor } from '../../lib/assets'
import { formatBytes } from '../../lib/format'
import { zipUrl, type AssetGroupId } from '../../lib/kit'
import type { ButtonVariant } from './button-styles'
import { ButtonLink } from './ButtonLink'

interface ZipButtonProps {
  group: AssetGroupId
  label: string
  variant?: ButtonVariant
}

/** "Download all" for one asset group. Disabled until `npm run kit:zips` has built the ZIP. */
export function ZipButton({ group, label, variant = 'secondary' }: ZipButtonProps) {
  const zip = assetFor(zipUrl(group))
  return (
    <ButtonLink href={zipUrl(group)} download variant={variant} disabled={!zip} aria-label={`Download ${label}, ZIP${zip ? `, ${formatBytes(zip.bytes)}` : ', not built yet'}`}>
      <DownloadSimple className="size-5" aria-hidden />
      {label}
      {zip && <span className="font-normal opacity-70">{formatBytes(zip.bytes)}</span>}
    </ButtonLink>
  )
}
