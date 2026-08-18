import type { Session } from '../interfaces/session'
import { formatDate, formatDuration } from '../lib/format'
import { Badge } from './Badge'
import { PencilIcon, TrashIcon } from './icons'

interface SessionRowProps {
  session: Session
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
}

export function SessionRow({ session, isEditing, onEdit, onDelete }: SessionRowProps) {
  return (
    <tr className={`border-b border-rule last:border-b-0 ${isEditing ? 'bg-paper-3' : ''}`}>
      <td className="whitespace-nowrap py-3 pr-4 pl-4 font-mono text-sm tabular-nums text-ink">
        {formatDate(session.date)}
      </td>
      <td className="whitespace-nowrap py-3 pr-4">
        <Badge tone={session.type === 'mac' ? 'accent' : 'neutral'}>
          {session.type === 'mac' ? 'Maç' : 'Antrenman'}
        </Badge>
      </td>
      <td className="max-w-40 truncate py-3 pr-4 text-sm text-ink" title={session.location}>
        {session.location}
      </td>
      <td className="max-w-32 truncate py-3 pr-4 text-sm text-neutral">
        {session.opponent || '—'}
      </td>
      <td className="whitespace-nowrap py-3 pr-4 font-mono text-sm tabular-nums text-neutral">
        {session.type === 'mac' ? session.score || '—' : '—'}
      </td>
      <td className="whitespace-nowrap py-3 pr-4">
        {session.type === 'mac' && session.result ? (
          <Badge tone={session.result === 'galibiyet' ? 'win' : 'loss'}>
            {session.result === 'galibiyet' ? 'Galibiyet' : 'Mağlubiyet'}
          </Badge>
        ) : (
          <span className="text-sm text-neutral">—</span>
        )}
      </td>
      <td className="whitespace-nowrap py-3 pr-4 font-mono text-sm tabular-nums text-neutral">
        {formatDuration(session.durationMinutes)}
      </td>
      <td className="max-w-48 truncate py-3 pr-4 text-sm text-neutral" title={session.notes}>
        {session.notes || '—'}
      </td>
      <td className="whitespace-nowrap py-3 pr-3 pl-2 text-right">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`${formatDate(session.date)} tarihli kaydı düzenle`}
            className="rounded-md p-2.5 text-muted transition-colors duration-150 ease-out hover:bg-paper-3 hover:text-ink"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`${formatDate(session.date)} tarihli kaydı sil`}
            className="rounded-md p-2.5 text-muted transition-colors duration-150 ease-out hover:bg-loss/15 hover:text-loss"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
