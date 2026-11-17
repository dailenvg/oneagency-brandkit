export type ButtonVariant = 'primary' | 'secondary' | 'on-light' | 'quiet'
export type ButtonSize = 'md' | 'sm'

const BASE =
  'inline-flex min-h-touch items-center justify-center gap-2 rounded-full border text-center font-semibold leading-tight transition-colors duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-3 aria-disabled:pointer-events-none aria-disabled:opacity-45 disabled:pointer-events-none disabled:opacity-45'

/**
 * The live site's .btn-primary / .btn-ghost colour states, plus the pressed step (--rose-deep, "pressed or hover step
 * of rose") and a proposed on-light pill (ink on paper).
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'border-rose bg-rose text-on-accent hover:bg-transparent hover:text-lavender-text active:border-rose-deep active:bg-rose-deep active:text-on-accent focus-visible:outline-text',
  secondary:
    'border-text bg-transparent text-text hover:bg-text hover:text-on-accent active:border-text-2 active:bg-text-2 active:text-on-accent focus-visible:outline-text',
  'on-light':
    'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink active:border-ink-2 active:bg-ink-2 active:text-paper focus-visible:outline-ink',
  quiet: 'border-edge bg-surface text-text hover:border-edge-strong hover:bg-raised active:bg-surface-2 focus-visible:outline-rose',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'px-6 py-2.5 text-step--1 sm:px-8',
  sm: 'px-4 py-2 text-step-small',
}

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') =>
  `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`
