// Bir antrenman ya da maç kaydını temsil eder.
// localStorage'da bu şekilde saklanır, form ve liste bileşenleri bu tipi paylaşır.

export type SessionType = 'antrenman' | 'mac'

export type MatchResult = 'galibiyet' | 'maglubiyet'

export interface Session {
  id: string
  date: string // ISO tarih, yyyy-mm-dd
  type: SessionType
  location: string
  durationMinutes: number
  opponent?: string // maç türünde rakip, antrenmanda partner/koç olabilir
  score?: string // yalnızca maç türünde anlamlı, örn "6-4, 3-6, 10-8"
  result?: MatchResult // yalnızca maç türünde
  notes?: string
  createdAt: number // sıralama ve id çakışmalarını çözmek için
}

// Formdan gelen, henüz id/createdAt atanmamış veri
export type SessionDraft = Omit<Session, 'id' | 'createdAt'>
