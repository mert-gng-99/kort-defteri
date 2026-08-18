import { useState, type FormEvent } from 'react'
import type { MatchResult, Session, SessionDraft, SessionType } from '../interfaces/session'

const inputClass =
  'w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-neutral/60'
const labelClass = 'text-xs font-medium uppercase tracking-wide text-muted'
const errorClass = 'text-xs text-loss'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

interface SessionFormProps {
  initial?: Session
  onSubmit: (draft: SessionDraft) => void
  onCancel?: () => void
}

export function SessionForm({ initial, onSubmit, onCancel }: SessionFormProps) {
  const [date, setDate] = useState(initial?.date ?? todayISO())
  const [type, setType] = useState<SessionType>(initial?.type ?? 'antrenman')
  const [location, setLocation] = useState(initial?.location ?? '')
  const [duration, setDuration] = useState(initial ? String(initial.durationMinutes) : '')
  const [opponent, setOpponent] = useState(initial?.opponent ?? '')
  const [score, setScore] = useState(initial?.score ?? '')
  const [result, setResult] = useState<MatchResult | ''>(initial?.result ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEdit = Boolean(initial)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}
    const durationNum = Number(duration)
    if (!date) nextErrors.date = 'Tarih gerekli.'
    if (!location.trim()) nextErrors.location = 'Kort ya da mekan bilgisi gerekli.'
    if (!duration || Number.isNaN(durationNum) || durationNum <= 0) {
      nextErrors.duration = 'Geçerli bir süre girin (dakika).'
    }
    if (type === 'mac' && !result) nextErrors.result = 'Maç sonucunu seçin.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    onSubmit({
      date,
      type,
      location: location.trim(),
      durationMinutes: durationNum,
      opponent: opponent.trim() || undefined,
      score: type === 'mac' ? score.trim() || undefined : undefined,
      result: type === 'mac' ? (result as MatchResult) : undefined,
      notes: notes.trim() || undefined,
    })

    if (!isEdit) {
      setDate(todayISO())
      setType('antrenman')
      setLocation('')
      setDuration('')
      setOpponent('')
      setScore('')
      setResult('')
      setNotes('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <span id="type-label" className={labelClass}>
          Kayıt türü
        </span>
        <div
          role="radiogroup"
          aria-labelledby="type-label"
          className="mt-1.5 inline-flex rounded-md border border-rule p-1"
        >
          {(['antrenman', 'mac'] as const).map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus ${
                type === t ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {t === 'antrenman' ? 'Antrenman' : 'Maç'}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>
            Tarih
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p id="date-error" className={`mt-1 ${errorClass}`}>
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="duration" className={labelClass}>
            Süre (dakika)
          </label>
          <input
            id="duration"
            type="number"
            min={1}
            inputMode="numeric"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="60"
            aria-describedby={errors.duration ? 'duration-error' : undefined}
          />
          {errors.duration && (
            <p id="duration-error" className={`mt-1 ${errorClass}`}>
              {errors.duration}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="location" className={labelClass}>
            Kort / mekan
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="Enka Spor Kulübü, kort 3"
            aria-describedby={errors.location ? 'location-error' : undefined}
          />
          {errors.location && (
            <p id="location-error" className={`mt-1 ${errorClass}`}>
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="opponent" className={labelClass}>
            {type === 'mac' ? 'Rakip' : 'Partner / koç'}
          </label>
          <input
            id="opponent"
            type="text"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder={type === 'mac' ? 'Rakip adı' : 'Antrenman ortağı (opsiyonel)'}
          />
        </div>

        {type === 'mac' && (
          <div>
            <label htmlFor="score" className={labelClass}>
              Skor
            </label>
            <input
              id="score"
              type="text"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className={`mt-1.5 ${inputClass} font-mono`}
              placeholder="6-4, 3-6, 10-8"
            />
          </div>
        )}

        {type === 'mac' && (
          <div className="sm:col-span-2">
            <span id="result-label" className={labelClass}>
              Sonuç
            </span>
            <div
              role="radiogroup"
              aria-labelledby="result-label"
              className="mt-1.5 flex gap-2"
            >
              {(['galibiyet', 'maglubiyet'] as const).map((r) => (
                <label
                  key={r}
                  className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus ${
                    result === r
                      ? r === 'galibiyet'
                        ? 'border-win/40 bg-win/15 text-win'
                        : 'border-loss/40 bg-loss/15 text-loss'
                      : 'border-rule text-muted hover:text-ink'
                  }`}
                >
                  <input
                    type="radio"
                    name="result"
                    value={r}
                    checked={result === r}
                    onChange={() => setResult(r)}
                    className="sr-only"
                  />
                  {r === 'galibiyet' ? 'Galibiyet' : 'Mağlubiyet'}
                </label>
              ))}
            </div>
            {errors.result && <p className={`mt-1 ${errorClass}`}>{errors.result}</p>}
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Not
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`mt-1.5 ${inputClass} min-h-20 resize-y`}
            placeholder="Servis günü iyiydi, backhand slice üzerinde çalışmaya devam"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform duration-150 ease-out active:scale-[0.98]"
        >
          {isEdit ? 'Kaydı güncelle' : 'Kaydı ekle'}
        </button>
        {isEdit && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-rule px-4 py-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}
