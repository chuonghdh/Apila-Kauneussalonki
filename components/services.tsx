import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { salon, serviceCategories } from '@/lib/salon'
import type { Dictionary, Lang } from '@/lib/i18n'

export function Services({ lang, t }: { lang: Lang; t: Dictionary['services'] }) {
  return (
    <section id="services" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{t.lead}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {serviceCategories.map((category) => (
            <article
              key={category.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card sm:flex-row"
            >
              <div className="relative aspect-[16/10] sm:aspect-auto sm:w-2/5">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={category.title[lang]}
                  fill
                  sizes="(min-width: 768px) 20vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-primary">{category.title[lang]}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{category.description[lang]}</p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {category.services.map((service) => (
                    <li key={`${service.name.fi}-${service.detail?.fi ?? ''}`} className="flex items-baseline gap-2 text-sm">
                      <span>
                        {service.name[lang]}
                        {service.detail && <span className="text-muted-foreground"> ({service.detail[lang]})</span>}
                      </span>
                      <span className="flex-1 border-b border-dotted border-border" aria-hidden="true" />
                      <span className="shrink-0 whitespace-nowrap font-medium tabular-nums text-primary">
                        {lang === 'en' ? `€${service.price}` : `${service.price} €`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            nativeButton={false}
            size="lg"
            className="h-12 rounded-full px-8"
            render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
          >
            {t.book}
          </Button>
        </div>
      </div>
    </section>
  )
}
