/** Placeholder while the code-split sections load: a few section-height blocks that shimmer. */
export function SectionsSkeleton() {
  return (
    // role="status": a generic div cannot carry aria-label; the hidden line is what screen readers announce.
    <div role="status" aria-busy="true" className="container-site flex flex-col gap-section py-section">
      <span className="sr-only">Loading the rest of the brand kit</span>
      {[0, 1, 2].map((i) => (
        <div key={i} aria-hidden className="flex flex-col gap-6">
          <div className="h-4 w-32 animate-pulse rounded-full bg-surface-2 motion-reduce:animate-none" />
          <div className="h-12 w-3/4 max-w-xl animate-pulse rounded-site-sm bg-surface-2 motion-reduce:animate-none" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="h-56 animate-pulse rounded-site bg-surface motion-reduce:animate-none" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
