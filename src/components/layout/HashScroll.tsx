import { useEffect } from 'react'

/**
 * Renders nothing. Mounted after the lazy sections resolve, it re-applies a deep link (#assets) that the browser tried
 * before those sections existed: once now, and again when images and fonts above it have finished loading.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    jump()
    if (document.readyState === 'complete') return
    window.addEventListener('load', jump, { once: true })
    return () => window.removeEventListener('load', jump)
  }, [])
  return null
}
