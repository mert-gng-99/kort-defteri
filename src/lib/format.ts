// ISO tarihi (yyyy-mm-dd) gün.ay.yıl formatında gösterir
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  return `${day}.${month}.${year}`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} sa` : `${hours} sa ${rest} dk`
}
