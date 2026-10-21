import Image from 'next/image'
import { GraduationCap, Phone, Store } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { ContactFormButton } from '@/components/contact-form'
import { salon } from '@/lib/salon'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/i18n'

const icons = [GraduationCap, Store]

export function Training({ t }: { t: Dictionary['training'] }) {
  return (
    <section id="training" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
        <div className="reveal flex flex-col gap-6 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf-text">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{t.lead}</p>

          <ul className="flex flex-col gap-4">
            {t.programs.map(({ title, text }, i) => {
              const Icon = icons[i] ?? GraduationCap
              return (
                <li
                  key={title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="flex flex-col gap-1 rounded-2xl bg-forest p-5 text-forest-foreground">
            <p className="text-xs uppercase tracking-wider text-forest-foreground/60">{t.priceLabel}</p>
            <p className="font-serif text-3xl font-semibold text-gold">{t.priceRange}</p>
            <p className="text-sm text-forest-foreground/75">{t.priceNote}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ContactFormButton topic="training" className={cn(buttonVariants({ size: 'lg' }), 'h-12 rounded-full px-7 hover:bg-primary/80')}>
              {t.cta}
            </ContactFormButton>
            <Button
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-7"
              render={<a href={salon.phoneHref} />}
            >
              <Phone className="size-4" aria-hidden="true" />
              {t.call} {salon.phoneDisplay}
            </Button>
          </div>
        </div>

        <div className="reveal-fade image-sheen relative aspect-[4/5] overflow-hidden rounded-3xl [--sheen-delay:2.5s] md:order-1">
          <Image
            src="/images/training.webp"
            alt={t.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
