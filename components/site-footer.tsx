import { BrandLogo } from '@/components/brand-logo'
import { ContactFormButton } from '@/components/contact-form'
import { FacebookIcon, InstagramIcon } from '@/components/social-icons'
import { salon } from '@/lib/salon'
import type { Dictionary } from '@/lib/i18n'

export function SiteFooter({ t }: { t: Dictionary['footer'] }) {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <BrandLogo inverted />
          <p className="text-sm text-forest-foreground/60">{t.tagline}</p>
          <div className="flex gap-2">
            <a
              href={salon.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-forest-foreground/20 transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-4" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href={salon.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-forest-foreground/20 transition-colors hover:border-gold hover:text-gold"
            >
              <FacebookIcon className="size-4" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
        <address className="flex flex-col gap-1 text-sm not-italic text-forest-foreground/75">
          <a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            {salon.street}, {salon.city}
          </a>
          <a href={salon.phoneHref} className="hover:text-gold">
            {salon.phoneDisplay}
          </a>
          <ContactFormButton className="text-left hover:text-gold">{salon.email}</ContactFormButton>
        </address>
      </div>
      <div className="border-t border-forest-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-forest-foreground/60">
          © {new Date().getFullYear()} {salon.name}. {t.rights}
        </p>
      </div>
    </footer>
  )
}
