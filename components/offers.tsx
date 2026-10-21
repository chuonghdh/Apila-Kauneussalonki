import { ExternalLink, Gift, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ContactFormButton } from '@/components/contact-form'
import { salon } from '@/lib/salon'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/i18n'

const cardClass =
  'reveal flex min-w-0 flex-col gap-6 rounded-3xl border border-forest-foreground/15 bg-forest-foreground/5 p-8 transition-colors duration-500 ease-out hover:bg-forest-foreground/10'

const iconClass = 'flex size-12 items-center justify-center rounded-full bg-leaf/20 text-leaf'

export function Offers({ t, promo }: { t: Dictionary['offers']; promo: Dictionary['promo'] }) {
  return (
    <section id="offers" className="scroll-mt-20 bg-forest py-20 text-forest-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-forest-foreground/70">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className={cardClass}>
            <span className={cn(iconClass, 'float-glow')}>
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-medium">{t.campaignTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-foreground/75">{promo.text}</p>
            </div>
            <a
              href={salon.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'shine h-auto min-h-12 self-start rounded-full bg-gold px-7 py-3 text-left whitespace-normal text-forest shadow-md transition-[scale,box-shadow,background-color] duration-300 ease-out hover:scale-105 hover:bg-gold/90 hover:shadow-lg active:scale-[0.98]',
              )}
            >
              {promo.cta}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </article>

          <article className={cardClass}>
            <span className={iconClass}>
              <Gift className="size-5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-medium">{t.giftTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-foreground/75">{t.giftText}</p>
            </div>
            <ContactFormButton
              topic="giftcards"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'h-12 self-start rounded-full border-forest-foreground/30 bg-transparent px-7 text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground',
              )}
            >
              {t.giftCta}
            </ContactFormButton>
          </article>
        </div>
      </div>
    </section>
  )
}
