import type { ReactNode } from 'react'

interface SubHeadingProps {
  title: string
  badge?: ReactNode
  children?: ReactNode
}

/** h3 inside a section, with an optional status badge and intro line. */
export function SubHeading({ title, badge, children }: SubHeadingProps) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h3 className="flex flex-wrap items-center gap-3 text-step-2 font-semibold tracking-tight">
        {title}
        {badge}
      </h3>
      {children && <div className="max-w-2xl text-step--1 text-text-2">{children}</div>}
    </div>
  )
}
