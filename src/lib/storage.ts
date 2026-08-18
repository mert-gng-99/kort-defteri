import type { Session } from '../interfaces/session'

const STORAGE_KEY = 'kort-defteri.sessions.v1'

export function loadSessions(): Session[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    // Bozuk veri varsa sıfırdan başla, uygulamayı çökertme
    return []
  }
}

export function saveSessions(sessions: Session[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}
