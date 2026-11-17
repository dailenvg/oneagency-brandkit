import { DownloadSimple, WarningCircle } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { ASSET_MANIFEST } from '../lib/assets'
import { formatBytes } from '../lib/format'
import { FULL_KIT_URL, type AssetGroupId } from '../lib/kit'
import { AssetRow } from './assets/AssetRow'
import { Section } from './layout/Section'
import { Button } from './ui/Button'
import { ButtonLink } from './ui/ButtonLink'
import { EmptyState } from './ui/EmptyState'
import { FilterTabs } from './ui/FilterTabs'
import { ZipButton } from './ui/ZipButton'

type Filter = AssetGroupId | 'all'

/** Rows shown before "Show more". */
const PAGE = 24

/** Every downloadable file, generated from disk, with per-group and full-kit ZIPs. */
export function AssetsSection() {
  const [filter, setFilter] = useState<Filter>('all')
  const [limit, setLimit] = useState(PAGE)
  const manifest = ASSET_MANIFEST

  const options = useMemo(
    () => (manifest ? [{ id: 'all' as Filter, label: 'All', count: manifest.files.length }, ...manifest.groups.map((g) => ({ id: g.id as Filter, label: g.label, count: g.count }))] : []),
    [manifest],
  )

  if (!manifest) {
    return (
      <Section id="assets" index="10" eyebrow="Assets" title="Every file, in one place" accent={[1]}>
        <EmptyState icon={WarningCircle} tone="error" title="The asset list has not been generated" action={<code className="font-mono text-step-small text-text-2">npm run kit:zips</code>}>
          The list and the ZIPs are built from the files on disk. Run the command below, then reload.
        </EmptyState>
      </Section>
    )
  }

  const files = filter === 'all' ? manifest.files : manifest.files.filter((f) => f.group === filter)
  const group = manifest.groups.find((g) => g.id === filter)

  return (
    <Section
      id="assets"
      index="10"
      eyebrow="Assets"
      title="Every file, in one place"
      accent={[1]}
      lede={`${manifest.files.length} files across ${manifest.groups.filter((g) => g.count).length} groups. Download one at a time, a group as a ZIP, or the full kit.`}
      actions={
        <ButtonLink href={FULL_KIT_URL} download aria-label={`Download full kit, ZIP, ${formatBytes(manifest.full.bytes)}`}>
          <DownloadSimple className="size-5" aria-hidden />
          Download full kit
          <span className="font-normal opacity-75">{formatBytes(manifest.full.bytes)}</span>
        </ButtonLink>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterTabs
            label="Filter assets by group"
            layoutId="assets-filter"
            options={options}
            value={filter}
            onChange={(f) => {
              setFilter(f)
              setLimit(PAGE)
            }}
            controls="asset-list"
          />
          {group && group.count > 0 && <ZipButton group={group.id} label={`All ${group.label.toLowerCase()}`} />}
        </div>

        {/* The tabpanel wraps the list (a role on the <ul> would drop its list semantics) and the empty state. */}
        <div id="asset-list" role="tabpanel" aria-label={group ? `Files: ${group.label}` : 'Files: all'}>
          {files.length ? (
            <motion.ul layout className="grid gap-3 lg:grid-cols-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {files.slice(0, limit).map((f) => (
                  <AssetRow key={f.url} asset={f} />
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <EmptyState icon={WarningCircle} title={`No ${group?.label.toLowerCase() ?? ''} files yet`}>
              This group fills in when its files land in public/kit/{filter}/. Rerun <code className="font-mono">npm run kit:zips</code> afterwards.
            </EmptyState>
          )}
        </div>

        {files.length > limit && (
          <Button variant="secondary" onClick={() => setLimit((n) => n + PAGE * 2)} className="self-center" aria-controls="asset-list">
            Show more ({files.length - limit} left)
          </Button>
        )}
        <p className="text-step-small text-text-3">
          List generated {manifest.generatedAt.slice(0, 10)} from the files in public/kit. File names follow one-agency_[asset]_[variant]_[size].[ext].
        </p>
      </div>
    </Section>
  )
}
