import { ArrowDown, DownloadSimple } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { GradientBar } from '../kit/motion/GradientBar'
import { Halo } from '../kit/motion/Halo'
import { Pop } from '../kit/motion/Pop'
import { WordRise } from '../kit/motion/WordRise'
import { ASSET_MANIFEST } from '../lib/assets'
import { formatBytes } from '../lib/format'
import { FULL_KIT_URL, VERSION_NOTE } from '../lib/kit'
import { brandIntro, distance, duration, overshoot, reveal, sequence, stagger } from '../lib/motion'
import { ButtonLink } from './ui/ButtonLink'

const LOGO = '/kit/logos/stacked/one-agency_logo_stacked-on-dark.svg'
const HEADLINE = 'The ONE Agency brand kit'
/** Cue for the copy under the headline: once the headline words have landed. */
const AFTER_HEADLINE = brandIntro.line + HEADLINE.split(' ').length * stagger.word + duration.move / 2

/** The film's brand intro: the logo scales in over the halo, the bar grows, then the headline rises in word by word. */
export function Hero() {
  const fullKit = ASSET_MANIFEST?.full
  const reduced = useReducedMotion()
  return (
    <section id="top" aria-labelledby="hero-title" className="glow-field relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 grid place-items-center">
        <Halo inView={false} className="aspect-square w-[min(120vw,960px)]" />
      </div>
      <div className="container-site flex min-h-[calc(100svh-var(--spacing-nav)-var(--spacing-nav-tabs))] flex-col items-center justify-center gap-8 py-section text-center xl:min-h-[calc(100svh-var(--spacing-nav))]">
        <Pop inView={false} delay={brandIntro.logo} from={distance.logoFrom} blur={distance.logoBlur} length={duration.logo} bounce={overshoot.logo}>
          <img src={LOGO} alt="ONE Agency" width={906} height={349} fetchPriority="high" className="block h-auto w-[clamp(200px,38vw,460px)]" />
        </Pop>
        <GradientBar inView={false} delay={brandIntro.bar} className="h-1.5 w-[clamp(96px,12vw,180px)]" />
        <WordRise as="h1" id="hero-title" inView={false} delay={brandIntro.line} text={HEADLINE} accent={[3]} className="text-step-4 font-bold leading-display tracking-tight text-balance" />
        <motion.div className="flex max-w-2xl flex-col items-center gap-6" variants={reduced ? sequence(0) : sequence(stagger.children, AFTER_HEADLINE)} initial="hidden" animate="show">
          <motion.p variants={reveal} className="font-num text-step--1 tracking-wide text-text-3">
            {VERSION_NOTE}
          </motion.p>
          <motion.p variants={reveal} className="text-step-1 leading-relaxed text-text-2 text-balance">
            Logos, colour, type, motion, ad templates and copy for ONE Agency, all digital. Read the rules in each section, then download single files or the whole kit.
          </motion.p>
          <motion.div variants={reveal} className="flex flex-wrap justify-center gap-3">
            <ButtonLink href={FULL_KIT_URL} download disabled={!fullKit}>
              <DownloadSimple className="size-5" aria-hidden />
              Download full kit
              {fullKit && <span className="font-normal opacity-75">{formatBytes(fullKit.bytes)}</span>}
            </ButtonLink>
            <ButtonLink href="#assets" variant="secondary">
              Go to assets
              <ArrowDown className="size-5" aria-hidden />
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
