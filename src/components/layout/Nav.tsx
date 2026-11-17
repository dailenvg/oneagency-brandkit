import { DownloadSimple } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { edgeFade, useScrollEdges, useScrollSpy } from '../../lib/hooks'
import { FULL_KIT_URL, KIT } from '../../lib/kit'
import { spring } from '../../lib/motion'
import { SECTION_IDS, SECTIONS } from '../../lib/sections'
import { ButtonLink } from '../ui/ButtonLink'

const LOGO = '/kit/logos/horizontal/one-agency_logo_horizontal-on-dark.svg'

function SectionLinks({ active, layoutId }: { active: string | null; layoutId: string }) {
  return (
    <ul className="flex items-center gap-1">
      {SECTIONS.map((s) => {
        const current = s.id === active
        return (
          <li key={s.id} className="shrink-0" data-section={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={current ? 'location' : undefined}
              // Ring hugs the pill: the strip scrolls, so anything further out is clipped.
              className={`relative inline-flex min-h-touch items-center rounded-full px-3.5 text-step-small font-semibold transition-colors focus-visible:outline-offset-0 ${
                current ? 'text-text' : 'text-text-3 hover:text-text'
              }`}
            >
              {current && (
                <motion.span layoutId={layoutId} transition={spring.layout} aria-hidden className="absolute inset-0 rounded-full border border-edge-strong/60 bg-surface-2" />
              )}
              <span className="relative">{s.label}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/** Sticky header: logo, section links with a sliding active pill, and the full-kit download. */
export function Nav() {
  const active = useScrollSpy(SECTION_IDS)
  const stripRef = useRef<HTMLDivElement>(null)
  const edges = useScrollEdges(stripRef)
  const reduced = useReducedMotion()

  // Keep the active link centred in the phone/tablet strip without moving the page; back to the start in the hero.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const item = active ? strip.querySelector<HTMLElement>(`[data-section="${active}"]`) : null
    const left = item ? item.offsetLeft - strip.clientWidth / 2 + item.clientWidth / 2 : 0
    strip.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' })
  }, [active, reduced])

  return (
    <header className="sticky top-0 z-50 border-b border-edge-soft bg-ground/85 backdrop-blur-md">
      <div className="container-site flex h-nav items-center justify-between gap-6">
        <a href="#top" className="flex min-h-touch shrink-0 items-center gap-3 rounded-site-sm" aria-label="ONE Agency brand kit, back to top">
          <img src={LOGO} alt="" width={1773} height={230} className="h-5 w-auto sm:h-6" />
          <span className="hidden rounded-full border border-edge px-2 py-0.5 font-num text-step-small text-text-3 sm:inline">v{KIT.version}</span>
        </a>
        <nav aria-label="Sections" className="hidden xl:block">
          <SectionLinks active={active} layoutId="nav-active-desktop" />
        </nav>
        <ButtonLink href={FULL_KIT_URL} download size="sm" aria-label="Download full kit (ZIP)">
          <DownloadSimple className="size-4" aria-hidden />
          <span className="hidden sm:inline">Download full kit</span>
          <span className="sm:hidden">Full kit</span>
        </ButtonLink>
      </div>
      <nav aria-label="Sections" className="border-t border-edge-soft xl:hidden">
        <div ref={stripRef} className="scroll-strip container-site relative flex h-nav-tabs items-center overflow-x-auto" style={edgeFade(edges)}>
          <SectionLinks active={active} layoutId="nav-active-strip" />
        </div>
      </nav>
    </header>
  )
}
