import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react'
import { AD_MANIFEST } from '../../lib/ads'
import { FONT_PAGES, KIT, VERSION_NOTE } from '../../lib/kit'
import { GradientBar } from '../../kit/motion/GradientBar'
import { ButtonLink } from '../ui/ButtonLink'

const LOGO = '/kit/logos/stacked/one-agency_logo_stacked-on-dark.svg'

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text underline decoration-edge-strong underline-offset-4 hover:text-rose hover:decoration-rose">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
      <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  )
}

/** Version note, provenance and back to top. */
export function Footer() {
  const magnific = AD_MANIFEST.status === 'ready' ? AD_MANIFEST.manifest.brandKitUrl ?? AD_MANIFEST.manifest.folderUrl : null
  return (
    <footer className="relative border-t border-edge-soft bg-void py-section">
      <div className="container-site grid gap-12 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-5">
          <img src={LOGO} alt="ONE Agency" width={906} height={349} loading="lazy" className="h-auto w-44" />
          <GradientBar className="h-1 w-24" />
          <p className="font-num text-step--1 text-text-2">{VERSION_NOTE}</p>
          <ButtonLink href="#top" variant="secondary" size="sm">
            <ArrowUp className="size-4" aria-hidden />
            Back to top
          </ButtonLink>
        </div>
        <div className="grid gap-8 text-step-small text-text-2 sm:grid-cols-3 lg:col-span-2">
          <div>
            <h2 className="mb-3 font-semibold text-text">Colour</h2>
            <p>
              Live CSS pulled {KIT.liveCssPulled}: <ExternalLink href={KIT.liveCss}>home.bundle.css</ExternalLink>. Values and token names are the site&apos;s, unchanged.
              Tints and shades are derived and labelled.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-semibold text-text">Fonts</h2>
            <p>
              The faces oneagency.com loads: <ExternalLink href={FONT_PAGES.geist}>Geist</ExternalLink>, <ExternalLink href={FONT_PAGES.lato}>Lato</ExternalLink> and{' '}
              <ExternalLink href={FONT_PAGES.metal}>Metal</ExternalLink>, all SIL Open Font License 1.1.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-semibold text-text">Templates</h2>
            <p>
              Ad templates are editable Magnific designs.{' '}
              {magnific ? <ExternalLink href={magnific}>Open the Magnific brand kit</ExternalLink> : <span>The Magnific link appears here once the templates are published.</span>}
            </p>
          </div>
          <p className="sm:col-span-3">
            Logo master: the live chrome ONE mark (oneagency.com/assets/img/one-agency-logo.svg). Motion follows the film &ldquo;ONE Agency: The Free Business Audit&rdquo;. ©{' '}
            {KIT.updated.slice(0, 4)} ONE Agency, LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
