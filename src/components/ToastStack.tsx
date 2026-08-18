import type { ToastItem } from '../hooks/useToast'
import { XIcon } from './icons'

interface ToastStackProps {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
      role="region"
      aria-label="Bildirimler"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-md border border-rule bg-paper-3 px-4 py-3 shadow-lg shadow-black/30"
        >
          <p className="flex-1 text-sm text-ink">{toast.message}</p>
          {toast.actionLabel && toast.onAction && (
            <button
              type="button"
              onClick={() => {
                toast.onAction?.()
                onDismiss(toast.id)
              }}
              className="shrink-0 text-sm font-semibold text-accent hover:underline"
            >
              {toast.actionLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Bildirimi kapat"
            className="shrink-0 rounded p-1 text-muted hover:text-ink"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
