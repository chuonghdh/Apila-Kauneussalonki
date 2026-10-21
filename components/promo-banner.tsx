import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { salon } from '@/lib/salon'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/i18n'

// Highlighted invitation to check current deals on Timma.
export function PromoBanner({
  promo,
  cta,
  className,
}: {
  promo: Dictionary['promo']
  cta: string
  className?: string
}) {
  return (
    <aside
      aria-label={promo.title}
      className={cn(
        'reveal promo-banner relative mx-auto flex max-w-4xl flex-col items-center gap-5 overflow-hidden rounded-3xl border border-white/70 px-6 py-7 text-center shadow-[0_24px_60px_-28px_oklch(0.4_0.1_150/0.55)] sm:flex-row sm:text-left md:px-9',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-gold/25 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-leaf/20 blur-3xl"
      />

      <span className="float-glow relative flex size-14 shrink-0 items-center justify-center rounded-full bg-white/85 text-primary shadow-sm">
        <Sparkles className="size-6" aria-hidden="true" />
      </span>

      <div className="relative flex-1">
        <h3 className="font-serif text-2xl font-semibold text-primary md:text-3xl">{promo.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/85 md:text-base">{promo.text}</p>
      </div>

      <Button
        nativeButton={false}
        size="lg"
        className="shine cta-lift h-12 shrink-0 rounded-full px-8 shadow-md [--shine-delay:3.2s]"
        render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
      >
        {cta}
      </Button>
    </aside>
  )
}
