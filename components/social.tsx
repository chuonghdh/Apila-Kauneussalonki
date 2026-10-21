import { ArrowUpRight, Star } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '@/components/social-icons'
import { salon } from '@/lib/salon'
import type { Dictionary } from '@/lib/i18n'

export function Social({ t }: { t: Dictionary['social'] }) {
  const links = [
    { href: salon.instagramUrl, label: t.instagram, handle: `@${salon.instagramHandle}`, Icon: InstagramIcon },
    { href: salon.facebookUrl, label: t.facebook, handle: 'Facebook', Icon: FacebookIcon },
    { href: salon.mapsUrl, label: t.reviews, handle: 'Google Maps', Icon: Star },
  ]

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf-text">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{t.lead}</p>
        </div>

        <ul className="reveal mt-12 grid gap-4 md:grid-cols-3">
          {links.map(({ href, label, handle, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/15"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-medium">{label}</span>
                  <span className="truncate text-sm text-muted-foreground">{handle}</span>
                </span>
                <ArrowUpRight
                  className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
