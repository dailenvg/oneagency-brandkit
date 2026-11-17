import { ArrowsIn, ArrowsOut } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { AD_MANIFEST, CHANNELS, displaySrc, manifestItems, type AdChannel, type AdGroup, type AdItem } from '../lib/ads'
import { sequence, stagger, viewport } from '../lib/motion'
import { AdFrame } from './ads/AdFrame'
import { AnimatedAds } from './ads/AnimatedAds'
import { PlannedSizes } from './ads/PlannedSizes'
import { Section } from './layout/Section'
import { SubHeading } from './layout/SubHeading'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { FilterTabs } from './ui/FilterTabs'
import { Lightbox } from './ui/Lightbox'
import { ManifestNotice } from './ui/ManifestNotice'
import { ZipButton } from './ui/ZipButton'

type Filter = AdChannel | 'all'

const GROUPS: { id: Exclude<AdGroup, 'imagery'>; title: string; intro: string }[] = [
  { id: 'template', title: 'Templates', intro: 'Editable in Magnific, with placeholder copy. Every ticket size.' },
  { id: 'sample', title: 'Sample ads', intro: 'The three approved concepts set in the templates.' },
]

/**
 * Ads: Magnific templates and samples by channel, fitted by default with true pixel size one tap away per channel (and
 * always in the lightbox), then the animated HTML5 ads.
 */
export function AdsSection() {
  const ads = useMemo(() => [...manifestItems('template'), ...manifestItems('sample')], [])
  const [filter, setFilter] = useState<Filter>('all')
  /** Rows (group + channel) switched to true pixel size. Everything else is fitted, so a phone never scrolls sideways. */
  const [trueSize, setTrueSize] = useState<ReadonlySet<string>>(() => new Set())
  const [open, setOpen] = useState<AdItem | null>(null)
  const toggleTrueSize = (row: string) =>
    setTrueSize((prev) => {
      const next = new Set(prev)
      if (next.has(row)) next.delete(row)
      else next.add(row)
      return next
    })

  const options = useMemo(
    () => [
      { id: 'all' as Filter, label: 'All', count: ads.length },
      ...CHANNELS.map((c) => ({ id: c.id as Filter, label: c.label, count: ads.filter((a) => a.channel === c.id).length })).filter((o) => o.count),
    ],
    [ads],
  )
  const visible = filter === 'all' ? ads : ads.filter((a) => a.channel === filter)
  const magnific = AD_MANIFEST.status === 'ready' ? AD_MANIFEST.manifest.brandKitUrl ?? AD_MANIFEST.manifest.folderUrl : null

  return (
    <Section
      id="ads"
      index="09"
      eyebrow="Ads"
      title="Templates, samples and motion"
      accent={[3]}
      band
      lede="Static templates and sample ads from Magnific, then the animated ads built on the film's moves. Ads fit your screen; switch any row to “View at true size” to check real pixels."
      actions={
        <>
          {magnific && (
            <a href={magnific} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-touch items-center px-2 font-semibold text-rose hover:text-text">
              Magnific brand kit
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <ZipButton group="templates" label="All templates" />
        </>
      }
    >
      <div className="flex flex-col gap-section">
        {ads.length ? (
          <div className="flex flex-col gap-10">
            <FilterTabs label="Filter ads by channel" layoutId="ads-channel" options={options} value={filter} onChange={setFilter} controls="ads-gallery" />
            <div id="ads-gallery" role="tabpanel" aria-label="Ads" className="flex flex-col gap-section">
              {GROUPS.map((g) => {
                const items = visible.filter((a) => a.group === g.id)
                return (
                  <div key={g.id}>
                    <SubHeading title={g.title} badge={<Badge>{items.length}</Badge>}>
                      {g.intro}
                    </SubHeading>
                    {items.length ? (
                      CHANNELS.map((c) => {
                        const inChannel = items.filter((a) => a.channel === c.id)
                        if (!inChannel.length) return null
                        const row = `${g.id}-${c.id}`
                        const real = trueSize.has(row)
                        return (
                          <div key={c.id} className="mb-10">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                              <h4 id={`ads-${row}`} className="text-step-1 font-semibold text-text-2">
                                {c.label}
                              </h4>
                              <Button variant="quiet" size="sm" onClick={() => toggleTrueSize(row)} aria-describedby={`ads-${row}`}>
                                {real ? <ArrowsIn className="size-4" aria-hidden /> : <ArrowsOut className="size-4" aria-hidden />}
                                {real ? 'Fit to screen' : 'View at true size'}
                              </Button>
                            </div>
                            <motion.div className="flex flex-wrap items-start gap-8" variants={sequence(stagger.children)} initial="hidden" whileInView="show" viewport={viewport}>
                              {inChannel.map((item) => (
                                <AdFrame key={item.id} item={item} fit={!real} onOpen={() => setOpen(item)} />
                              ))}
                            </motion.div>
                          </div>
                        )
                      })
                    ) : (
                      <ManifestNotice what={g.title.toLowerCase()} emptyHint={`No ${g.title.toLowerCase()} in this channel yet.`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <ManifestNotice what="ad templates and sample ads" />
            <div>
              <SubHeading title="Sizes on the way">Every size in the ticket, drawn to scale. Each one fills in when its Magnific template lands.</SubHeading>
              <PlannedSizes />
            </div>
          </div>
        )}

        <div>
          <SubHeading title="Animated ads" badge={<Badge tone="derived">Film moves</Badge>}>
            HTML5 ads driven by one-motion.js, with the approved sample copy. Each plays once and holds on the CTA; nothing flashes. Download the video, the GIF, the end
            frame or the HTML5 package for ad servers.
          </SubHeading>
          <AnimatedAds />
        </div>
      </div>

      <Lightbox open={!!open} onClose={() => setOpen(null)} title={open ? `${open.name} · ${open.width}×${open.height}` : ''}>
        {open && <img src={displaySrc(open.files)!} alt={open.name} width={open.width} height={open.height} className="mx-auto max-w-none" style={{ width: open.width }} />}
      </Lightbox>
    </Section>
  )
}
