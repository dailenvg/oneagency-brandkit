import { IconContext } from '@phosphor-icons/react'
import { MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Hero } from './components/Hero'
import { Footer } from './components/layout/Footer'
import { HashScroll } from './components/layout/HashScroll'
import { Nav } from './components/layout/Nav'
import { SectionsSkeleton } from './components/layout/SectionsSkeleton'
import { LogoSection } from './components/LogoSection'
import { ToastProvider } from './components/ui/ToastProvider'

/** Everything below the logo section is code-split; all chunks start loading on mount so anchors resolve quickly. */
const ColourSection = lazy(() => import('./components/ColourSection').then((m) => ({ default: m.ColourSection })))
const TypeSection = lazy(() => import('./components/TypeSection').then((m) => ({ default: m.TypeSection })))
const ElementsSection = lazy(() => import('./components/ElementsSection').then((m) => ({ default: m.ElementsSection })))
const ImagerySection = lazy(() => import('./components/ImagerySection').then((m) => ({ default: m.ImagerySection })))
const MotionSection = lazy(() => import('./components/MotionSection').then((m) => ({ default: m.MotionSection })))
const VoiceSection = lazy(() => import('./components/VoiceSection').then((m) => ({ default: m.VoiceSection })))
const CopySection = lazy(() => import('./components/CopySection').then((m) => ({ default: m.CopySection })))
const AdsSection = lazy(() => import('./components/AdsSection').then((m) => ({ default: m.AdsSection })))
const AssetsSection = lazy(() => import('./components/AssetsSection').then((m) => ({ default: m.AssetsSection })))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={{ weight: 'bold' }}>
        <ToastProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-90 focus:rounded-full focus:bg-rose focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <LogoSection />
            <Suspense fallback={<SectionsSkeleton />}>
              <ColourSection />
              <TypeSection />
              <ElementsSection />
              <ImagerySection />
              <MotionSection />
              <VoiceSection />
              <CopySection />
              <AdsSection />
              <AssetsSection />
              <HashScroll />
            </Suspense>
          </main>
          <Footer />
        </ToastProvider>
      </IconContext.Provider>
    </MotionConfig>
  )
}
