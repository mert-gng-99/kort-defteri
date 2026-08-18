import type { ReactNode } from 'react'

type BadgeTone = 'accent' | 'win' | 'loss' | 'neutral'

const toneClasses: Record<BadgeTone, string> = {
  accent: 'bg-accent/15 text-accent border-accent/30',
  win: 'bg-win/15 text-win border-win/30',
  loss: 'bg-loss/15 text-loss border-loss/30',
  neutral: 'bg-paper-3 text-muted border-rule',
}

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
