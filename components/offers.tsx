import { Gift, Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { salon } from '@/lib/salon'
import type { Dictionary } from '@/lib/i18n'

const icons = [Percent, Gift]

export function Offers({ t }: { t: Dictionary['offers'] }) {
  return (
    <section id="offers" className="scroll-mt-20 bg-forest py-20 text-forest-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-forest-foreground/70">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.items.map(({ highlight, title, text }, i) => {
            const Icon = icons[i] ?? Gift
            return (
              <article
                key={title}
                className="flex flex-col gap-6 rounded-3xl border border-forest-foreground/15 bg-forest-foreground/5 p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-6xl font-semibold text-gold md:text-7xl">{highlight}</span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-leaf/20 text-leaf">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-foreground/70">{text}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-forest-foreground/50">{t.terms}</p>
          <Button
            nativeButton={false}
            size="lg"
            className="h-12 rounded-full bg-gold px-7 text-forest hover:bg-gold/90"
            render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
          >
            {t.book}
          </Button>
        </div>
      </div>
    </section>
  )
}
