import Image from 'next/image'
import { ArrowUpRight, Clock, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { salon } from '@/lib/salon'
import type { Dictionary } from '@/lib/i18n'

export function Hero({ t, promo, hours }: { t: Dictionary['hero']; promo: Dictionary['promo']; hours: string }) {
  return (
    <section className="relative overflow-hidden bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="flex min-w-0 flex-col gap-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t.eyebrow}</p>
          <h1 className="font-serif text-4xl leading-[1.05] font-medium text-balance break-words min-[400px]:text-5xl md:text-6xl lg:text-7xl">
            {t.titleStart} <em className="text-leaf">{t.titleEmphasis}</em>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-forest-foreground/80">{t.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              size="lg"
              className="shine cta-lift h-12 rounded-full bg-gold px-7 text-forest [--shine-delay:0.6s] hover:bg-gold/90"
              render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
            >
              {t.book}
            </Button>
            <Button
              nativeButton={false}
              size="lg"
              variant="outline"
              className="cta-lift h-12 rounded-full border-forest-foreground/30 bg-forest-foreground/5 px-7 text-forest-foreground backdrop-blur-sm hover:bg-forest-foreground/10 hover:text-forest-foreground"
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
          <div className="image-sheen relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl border border-forest-foreground/15 [--sheen-delay:1s]">
            <Image
              src="/images/hero.webp"
              alt={t.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <a
            href={salon.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shine shine-soft group absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-white/60 bg-background/80 p-4 text-foreground shadow-xl shadow-black/20 backdrop-blur-md transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-leaf/30 md:-left-10"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-snug">
              <span className="font-serif text-lg font-semibold text-primary">{promo.badgeTitle}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                {promo.badgeLink}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
