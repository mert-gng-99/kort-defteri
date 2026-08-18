import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { SessionForm } from '../components/SessionForm'
import { SessionList } from '../components/SessionList'
import { StatStrip } from '../components/StatStrip'
import { ToastStack } from '../components/ToastStack'
import { useSessions } from '../hooks/useSessions'
import { useToast } from '../hooks/useToast'
import { formatDate } from '../lib/format'

export function Dashboard() {
  const { sessions, addSession, updateSession, deleteSession, restoreSession } = useSessions()
  const { toasts, push, dismiss } = useToast()
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingSession = sessions.find((s) => s.id === editingId) ?? null

  function handleDelete(id: string) {
    const target = sessions.find((s) => s.id === id)
    const removed = deleteSession(id)
    if (!removed) return
    if (editingId === id) setEditingId(null)
    push(`${target ? formatDate(target.date) : 'Kayıt'} silindi.`, {
      actionLabel: 'Geri al',
      onAction: () => restoreSession(removed.session, removed.index),
    })
  }

  return (
    <div className="mx-auto flex min-w-0 max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <AppHeader />
      <StatStrip sessions={sessions} />

      <section className="max-w-2xl rounded-lg border border-rule bg-paper-2 p-6">
        <h2 className="font-display text-xl uppercase tracking-tight text-ink">
          {editingSession ? 'Kaydı düzenle' : 'Yeni kayıt'}
        </h2>
        <div className="mt-4">
          <SessionForm
            key={editingId ?? 'new'}
            initial={editingSession ?? undefined}
            onSubmit={(draft) => {
              if (editingSession) {
                updateSession(editingSession.id, draft)
                setEditingId(null)
              } else {
                addSession(draft)
              }
            }}
            onCancel={editingSession ? () => setEditingId(null) : undefined}
          />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl uppercase tracking-tight text-ink">Geçmiş</h2>
        <div className="mt-4">
          <SessionList
            sessions={sessions}
            editingId={editingId}
            onEdit={setEditingId}
            onDelete={handleDelete}
          />
        </div>
      </section>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
