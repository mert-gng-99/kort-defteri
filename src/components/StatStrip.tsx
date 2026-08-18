import type { Session } from '../interfaces/session'

export function StatStrip({ sessions }: { sessions: Session[] }) {
  const totalSessions = sessions.length
  const totalHours = sessions.reduce((sum, s) => sum + s.durationMinutes, 0) / 60

  const matches = sessions.filter((s) => s.type === 'mac' && s.result)
  const wins = matches.filter((s) => s.result === 'galibiyet').length
  const winRate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : null

  return (
    <section className="flex flex-col gap-6 rounded-lg border border-rule bg-paper-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-display font-semibold tabular-nums text-ink">
            {winRate === null ? '—' : winRate}
          </span>
          {winRate !== null && <span className="font-mono text-lg text-muted">%</span>}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Maç galibiyet oranı
          </p>
          <p className="text-sm text-neutral">
            {matches.length === 0 ? 'henüz maç kaydı yok' : `${wins} galibiyet / ${matches.length} maç`}
          </p>
        </div>
      </div>

      <div className="hidden h-12 w-px bg-rule sm:block" aria-hidden="true" />

      <div className="flex gap-8">
        <div>
          <p className="font-mono text-xl tabular-nums text-ink">{totalSessions}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Toplam kayıt</p>
        </div>
        <div>
          <p className="font-mono text-xl tabular-nums text-ink">{totalHours.toFixed(1)}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Saat kort süresi</p>
        </div>
      </div>
    </section>
  )
}
