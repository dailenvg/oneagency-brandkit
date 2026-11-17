import { useEffect, useState, useSyncExternalStore, type CSSProperties, type RefObject } from 'react'

/** Share of the viewport height where the scroll-spy band starts (matches the default rootMargin top). */
const SPY_LINE = 0.35

/**
 * Id of the section currently crossing the upper third of the viewport, or null above the first section (the hero).
 * Below the last section (footer) the last one stays active. Sections that mount later (code-split) are picked up as
 * they appear.
 */
export function useScrollSpy(ids: string[], rootMargin = '-35% 0px -60% 0px') {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const inBand = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id)
          else inBand.delete(e.target.id)
        }
        const current = [...ids].reverse().find((id) => inBand.has(id))
        if (current) return setActive(current)
        // Nothing in the band: in the hero, clear; in the footer, keep the last section.
        const first = document.getElementById(ids[0])
        if (first && first.getBoundingClientRect().top > window.innerHeight * SPY_LINE) setActive(null)
      },
      { rootMargin },
    )
    const seen = new Set<string>()
    const observeNew = () => {
      for (const id of ids) {
        const el = seen.has(id) ? null : document.getElementById(id)
        if (!el) continue
        seen.add(id)
        io.observe(el)
      }
      if (seen.size === ids.length) mo.disconnect()
    }
    const mo = new MutationObserver(observeNew)
    mo.observe(document.body, { childList: true, subtree: true })
    observeNew()
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [ids, rootMargin])
  return active
}

/**
 * True once the element with this id has scrolled out of view, and false again when it comes back. The top edge is
 * the page's scroll-padding-top, the band a fixed header covers, so an anchor jump that parks the element's last
 * pixels under the header still counts as scrolled past.
 */
export function useScrolledPast(id: string) {
  const [past, setPast] = useState(false)
  const tablet = useMediaQuery('(min-width: 768px)')
  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    // One extra pixel: an element that only touches the edge, as an anchor jump leaves it, still counts as intersecting.
    const inset = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) + 1
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0), { rootMargin: `-${inset}px 0px 0px 0px` })
    io.observe(el)
    return () => io.disconnect()
  }, [id, tablet])
  return past
}

/**
 * True while the element is on screen and the tab is visible. Gate endless loops on this so off-screen motion never
 * competes with scrolling for frames.
 */
export function useOnScreen<T extends Element>(ref: RefObject<T | null>, margin = '0px') {
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])
  const visible = useSyncExternalStore(
    (onChange) => {
      document.addEventListener('visibilitychange', onChange)
      return () => document.removeEventListener('visibilitychange', onChange)
    },
    () => document.visibilityState === 'visible',
  )
  return onScreen && visible
}

/**
 * Whether a horizontal scroller has hidden content before (start) or after (end) what is showing. Drives the fade
 * edges that tell people a strip scrolls.
 */
export function useScrollEdges<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [edges, setEdges] = useState({ start: false, end: false })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const start = el.scrollLeft > 1
      const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    Array.from(el.children).forEach((child) => ro.observe(child))
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [ref])
  return edges
}

/** Fade width for scroll edges, px (8pt grid). */
const EDGE_FADE = 32

/** Mask that fades whichever edge of a horizontal scroller has more content behind it. */
export function edgeFade({ start, end }: { start: boolean; end: boolean }): CSSProperties {
  if (!start && !end) return {}
  const mask = `linear-gradient(to right, ${start ? 'transparent' : '#000'} 0, #000 ${EDGE_FADE}px, #000 calc(100% - ${EDGE_FADE}px), ${end ? 'transparent' : '#000'} 100%)`
  return { maskImage: mask, WebkitMaskImage: mask }
}

/** Live result of a CSS media query. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => matchMedia(query).matches,
  )
}
