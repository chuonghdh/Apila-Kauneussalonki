import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FacebookIcon, InstagramIcon } from '@/components/social-icons'
import { salon } from '@/lib/salon'
import type { Dictionary } from '@/lib/i18n'

const mapQuery = encodeURIComponent(`Apila Kauneussalonki, ${salon.street}, ${salon.city}`)

export function Contact({ t, hours }: { t: Dictionary['contact']; hours: string }) {
  const items = [
    { icon: MapPin, label: t.address, value: `${salon.street}, ${salon.city}`, href: salon.mapsUrl },
    { icon: Phone, label: t.phone, value: salon.phoneDisplay, href: salon.phoneHref },
    { icon: Mail, label: t.email, value: salon.email, href: `mailto:${salon.email}` },
    { icon: Clock, label: t.hours, value: hours },
  ]

  return (
    <section id="contact" className="scroll-mt-20 bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf">{t.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          </div>
          <ul className="flex flex-col gap-5">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-gold shadow-sm">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="break-words font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-primary">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              size="lg"
              className="h-12 rounded-full px-8"
              render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
            >
              {t.book}
            </Button>
            <a
              href={salon.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <InstagramIcon className="size-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href={salon.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <FacebookIcon className="size-5" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="min-h-80 flex-1 overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
            <iframe
              title={t.mapTitle}
              src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
              className="size-full min-h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={salon.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Navigation className="size-4" aria-hidden="true" />
            {t.directions}
          </a>
        </div>
      </div>
    </section>
  )
}
