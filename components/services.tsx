import { PromoBanner } from '@/components/promo-banner'
import { ServiceCategoryGrid } from '@/components/service-category'
import { serviceCategories } from '@/lib/salon'
import type { Dictionary, Lang } from '@/lib/i18n'

export function Services({
  lang,
  t,
  promo,
}: {
  lang: Lang
  t: Dictionary['services']
  promo: Dictionary['promo']
}) {
  return (
    <section id="services" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf-text">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{t.lead}</p>
        </div>

        <ServiceCategoryGrid
          categories={serviceCategories}
          lang={lang}
          labels={{ open: t.viewPrices, close: t.hidePrices }}
        />

        <PromoBanner promo={promo} cta={t.book} className="mt-14" />
      </div>
    </section>
  )
}
