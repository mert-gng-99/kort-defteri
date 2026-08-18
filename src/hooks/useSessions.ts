import { useEffect, useState } from 'react'
import type { Session, SessionDraft } from '../interfaces/session'
import { loadSessions, saveSessions } from '../lib/storage'

function makeId(): string {
  if ('randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>(() => loadSessions())

  // Her değişiklikte localStorage'a yaz
  useEffect(() => {
    saveSessions(sessions)
  }, [sessions])

  function addSession(draft: SessionDraft) {
    const session: Session = { ...draft, id: makeId(), createdAt: Date.now() }
    setSessions((prev) => [session, ...prev])
  }

  function updateSession(id: string, draft: SessionDraft) {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...draft } : s)))
  }

  // Kaydı siler ve geri almak için gereken bilgiyi döner (undo toast bunu kullanır)
  function deleteSession(id: string): { session: Session; index: number } | null {
    const index = sessions.findIndex((s) => s.id === id)
    if (index === -1) return null
    const session = sessions[index]
    setSessions((prev) => prev.filter((s) => s.id !== id))
    return { session, index }
  }

  function restoreSession(session: Session, index: number) {
    setSessions((prev) => {
      const next = [...prev]
      next.splice(index, 0, session)
      return next
    })
  }

  return { sessions, addSession, updateSession, deleteSession, restoreSession }
}
