import { BallIcon } from './icons'

export function AppHeader() {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
      <div className="flex items-center gap-3">
        <BallIcon className="h-8 w-8 text-accent" />
        <div>
          <h1 className="font-display text-3xl leading-none tracking-tight text-ink uppercase">
            Kort Defteri
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-muted">
            Antrenman ve maç kayıtlarını tut, kortta neyin işe yaradığını zamanla gör.
          </p>
        </div>
      </div>
    </header>
  )
}
