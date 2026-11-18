import { GlassCard } from '../../../../kit/glass/GlassCard'
import { adText } from '../ad-type'
import { FitScaleContext } from '../fit-scale'
import { Stage } from './Stage'
import type { VisualProps } from './visual-props'

/**
 * Results: the home page stat bar as a glass board, two by two, gradient dividers between the columns, with the line
 * that qualifies the figures under them. Full width already, so it never bleeds.
 */
/**
 * Space above the numerals and below the legal line, in exported px at any fit scale (ad px are half): 36, so the
 * glyphs clear the edge by at least 30 whatever the line box adds.
 */
const BOARD_PAD = 36 / 2

export function StatBoardVisual({ concept, format, className, placement }: VisualProps) {
  const wide = format === 'landscape'
  const type = wide ? 'landscape' : 'square'
  return (
    <Stage width={480} height={wide ? 380 : 340} arc={{ width: 640, top: -68 }} glow={{ width: 460, bottom: -6 }} placement={placement} className={className}>
      <FitScaleContext.Consumer>
        {(fit) => (
          // Natural height, centred: the floored labels can grow the board, never push the numerals into its edge.
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <GlassCard className={`grid grid-cols-2 px-6 ${wide ? 'gap-y-3' : 'gap-y-5'}`} style={{ paddingBlock: Math.max(24, BOARD_PAD / fit) }}>
              {concept.stats.map((s, i) => (
                <div key={s.value} className={`relative flex flex-col items-center gap-1 text-center ${i % 2 ? 'stat-divided' : ''}`}>
                  <span className="stat-num" style={{ ...adText('stat', 'square', wide ? 0.86 : 1), lineHeight: 1.05 }}>
                    {s.value}
                  </span>
                  <span style={adText('statLabel', type, 1, fit)}>{s.label}</span>
                </div>
              ))}
              {concept.small && (
                <p className="col-span-2 text-center text-balance" style={adText('legal', type, 1, fit)}>
                  {concept.small}
                </p>
              )}
            </GlassCard>
          </div>
        )}
      </FitScaleContext.Consumer>
    </Stage>
  )
}
