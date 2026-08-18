import type { Session } from '../interfaces/session'
import { EmptyState } from './EmptyState'
import { SessionRow } from './SessionRow'

const headClass = 'py-2.5 pr-4 text-left text-xs font-medium uppercase tracking-wide text-muted first:pl-4'

interface SessionListProps {
  sessions: Session[]
  editingId: string | null
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function SessionList({ sessions, editingId, onEdit, onDelete }: SessionListProps) {
  if (sessions.length === 0) return <EmptyState />

  const sorted = [...sessions].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date)
    return b.createdAt - a.createdAt
  })

  return (
    <div className="overflow-x-auto rounded-lg border border-rule">
      <table className="w-full min-w-[820px] border-collapse">
        <thead>
          <tr className="border-b border-rule">
            <th className={headClass}>Tarih</th>
            <th className={headClass}>Tür</th>
            <th className={headClass}>Kort</th>
            <th className={headClass}>Rakip / Partner</th>
            <th className={headClass}>Skor</th>
            <th className={headClass}>Sonuç</th>
            <th className={headClass}>Süre</th>
            <th className={headClass}>Not</th>
            <th className={`${headClass} text-right`}>
              <span className="sr-only">İşlemler</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((session) => (
            <SessionRow
              key={session.id}
              session={session}
              isEditing={session.id === editingId}
              onEdit={() => onEdit(session.id)}
              onDelete={() => onDelete(session.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
