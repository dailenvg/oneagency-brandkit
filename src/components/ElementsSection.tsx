import { GradientBar } from '../kit/motion/GradientBar'
import { Halo } from '../kit/motion/Halo'
import { LineDraw } from '../kit/motion/LineDraw'
import { AwardBadge } from './elements/AwardBadge'
import { CtaStates } from './elements/CtaStates'
import { ElementCard } from './elements/ElementCard'
import { IconSet } from './elements/IconSet'
import { StatBar } from './elements/StatBar'
import { Section } from './layout/Section'
import { SubHeading } from './layout/SubHeading'
import { Reveal } from './ui/Reveal'
import { ZipButton } from './ui/ZipButton'

/** Left to right and upward, ending on the result. */
const LINE = [
  [20, 170],
  [140, 150],
  [250, 120],
  [370, 88],
  [480, 60],
  [580, 30],
] as const

const RULES = [
  { id: 'divider-hairline', bg: 'var(--v2-hairline)', cls: 'h-px w-full' },
  { id: 'divider-lit-edge', bg: 'var(--v2-lit-edge)', cls: 'h-0.5 w-full' },
  { id: 'divider-stat', bg: 'var(--stat-divider)', cls: 'h-32 w-px' },
  { id: 'divider-stat-h', bg: 'var(--stat-divider-h)', cls: 'h-px w-1/2' },
]

/** Graphic elements: the bar, the line, halo, grounds, dividers, CTAs, proof bar, award badge and icons. */
export function ElementsSection() {
  return (
    <Section
      id="elements"
      index="04"
      eyebrow="Graphic elements"
      title="A line that always ends on a result"
      accent={[7]}
      lede="Shapes and treatments from the live site and the film. Every one downloads as SVG and PNG."
      actions={<ZipButton group="elements" label="All elements" />}
    >
      <div className="flex flex-col gap-section">
        <Reveal stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ElementCard ids={['gradient-bar']} level={3} replayable>
            <GradientBar className="h-2 w-3/4" />
          </ElementCard>
          <ElementCard ids={['gradient-line']} level={3} replayable>
            <LineDraw points={LINE} width={600} height={200} className="h-auto w-full" label="A line climbing left to right that ends on a result dot" />
          </ElementCard>
          <ElementCard ids={['halo']} level={3} replayable>
            <Halo className="absolute inset-y-0 left-1/2 aspect-square h-full -translate-x-1/2" />
            <span className="relative font-num text-step-3 font-bold">450K+</span>
          </ElementCard>
          <ElementCard ids={['glow-field']} level={3} stage="glow-field h-56">
            <span className="sr-only">Night-navy ground with a rose glow top left and a blue glow bottom right.</span>
          </ElementCard>
          <ElementCard ids={RULES.map((r) => r.id)} title="Dividers" level={3} stage="h-56 bg-ground p-8">
            <div className="grid w-full grid-cols-2 items-center gap-6">
              <div className="flex flex-col gap-8">
                {RULES.filter((r) => r.id !== 'divider-stat').map((r) => (
                  <span key={r.id} aria-hidden className={`block ${r.cls}`} style={{ background: r.bg }} />
                ))}
              </div>
              <span aria-hidden className={`mx-auto block ${RULES[2].cls}`} style={{ background: RULES[2].bg }} />
            </div>
          </ElementCard>
          <ElementCard ids={['laurel']} level={3} stage="h-56 bg-ground p-8">
            <img src="/kit/elements/one-agency_element_laurel.svg" alt="" width={240} height={240} className="h-full w-auto" loading="lazy" />
          </ElementCard>
        </Reveal>

        <div>
          <SubHeading title="CTA buttons">Every state, from the live site&apos;s button styles. One primary CTA per ad.</SubHeading>
          <Reveal className="flex flex-col gap-4">
            <CtaStates />
            <ElementCard ids={['cta-primary', 'cta-secondary', 'cta-on-light']} title="CTA files" />
          </Reveal>
        </div>

        <div>
          <SubHeading title="Proof bar">
            Big numbers with the source line directly underneath, never in a footnote elsewhere. The four site figures always carry &ldquo;As published on oneagency.com,
            November 2026.&rdquo;
          </SubHeading>
          <Reveal stagger>
            <ElementCard ids={['stat-bar']} stage="bg-void p-0">
              <div className="w-full">
                <StatBar />
              </div>
            </ElementCard>
          </Reveal>
        </div>

        <div>
          <SubHeading title="Award badge">The ARDY award belongs to ConversionIQ.ai. The attribution line is part of the badge and is never dropped.</SubHeading>
          <Reveal stagger>
            <ElementCard ids={['award-badge']} stage="bg-void p-0">
              <div className="w-full">
                <AwardBadge />
              </div>
            </ElementCard>
          </Reveal>
        </div>

        <div>
          <SubHeading title="Icons">Phosphor, bold weight only, white or rose. Tap or click an icon to download its SVG; the full set is in the elements ZIP.</SubHeading>
          <IconSet />
        </div>
      </div>
    </Section>
  )
}
