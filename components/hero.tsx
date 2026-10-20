import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { salon } from '@/lib/salon'
import type { Dictionary } from '@/lib/i18n'

export function Hero({ t, hours }: { t: Dictionary['hero']; hours: string }) {
  return (
    <section className="relative overflow-hidden bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t.eyebrow}</p>
          <h1 className="font-serif text-5xl leading-[1.05] font-medium text-balance md:text-6xl lg:text-7xl">
            {t.titleStart} <em className="text-leaf">{t.titleEmphasis}</em>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-forest-foreground/80">{t.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              size="lg"
              className="h-12 rounded-full bg-gold px-7 text-forest hover:bg-gold/90"
              render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
            >
              {t.book}
            </Button>
            <Button
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-forest-foreground/30 bg-transparent px-7 text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground"
              render={<a href="#services" />}
            >
              {t.prices}
            </Button>
          </div>
          <ul className="flex flex-col gap-2 pt-2 text-sm text-forest-foreground/75 sm:flex-row sm:gap-6">
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-gold" aria-hidden="true" />
              {hours}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden="true" />
              {salon.street}, Tampere
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl border border-forest-foreground/15">
            <Image
              src="/images/hero.webp"
              alt={t.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-background p-4 text-foreground shadow-xl md:-left-10">
            <span className="font-serif text-4xl font-semibold text-primary">20%</span>
            <span className="text-xs leading-snug text-muted-foreground">
              {t.badgeLine1}
              <br />
              {t.badgeLine2}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
