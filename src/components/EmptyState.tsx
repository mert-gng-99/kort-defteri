import { BallIcon } from './icons'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-rule px-6 py-16 text-center">
      <BallIcon className="h-10 w-10 text-neutral" />
      <p className="font-display text-xl uppercase tracking-tight text-ink">
        Kort defteri boş
      </p>
      <p className="max-w-xs text-sm text-muted">
        İlk antrenmanını ya da maçını yukarıdaki formdan ekle, geçmişin burada birikmeye
        başlasın.
      </p>
    </div>
  )
}
