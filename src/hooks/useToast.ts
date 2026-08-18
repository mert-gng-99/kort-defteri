import { useCallback, useRef, useState } from 'react'

export interface ToastItem {
  id: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

const AUTO_DISMISS_MS = 6000

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback(
    (message: string, options?: { actionLabel?: string; onAction?: () => void }) => {
      const id = crypto.randomUUID?.() ?? `${Date.now()}`
      const toast: ToastItem = { id, message, ...options }
      setToasts((prev) => [...prev, toast])
      const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
      timers.current.set(id, timer)
      return id
    },
    [dismiss],
  )

  return { toasts, push, dismiss }
}
