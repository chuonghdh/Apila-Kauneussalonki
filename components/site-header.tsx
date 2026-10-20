'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand-logo'
import { FacebookIcon, InstagramIcon } from '@/components/social-icons'
import { salon } from '@/lib/salon'
import { homePath, type Dictionary, type Lang } from '@/lib/i18n'

const socialLinks = [
  { href: salon.instagramUrl, label: 'Instagram', Icon: InstagramIcon },
  { href: salon.facebookUrl, label: 'Facebook', Icon: FacebookIcon },
]

export function SiteHeader({ lang, t }: { lang: Lang; t: Dictionary['nav'] }) {
  const [open, setOpen] = useState(false)
  const otherLang: Lang = lang === 'fi' ? 'en' : 'fi'

  const navItems = [
    { href: '#services', label: t.services },
    { href: '#about', label: t.about },
    { href: '#training', label: t.training },
    { href: '#offers', label: t.offers },
    { href: '#contact', label: t.contact },
  ]

  const languageLink = (
    <Link
      href={homePath[otherLang]}
      hrefLang={otherLang}
      lang={otherLang}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <Globe className="size-3.5" aria-hidden="true" />
      {t.switchLanguage}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={homePath[lang]} aria-label={t.home}>
          <BrandLogo />
        </Link>

        <nav aria-label={t.mainMenu} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 ease-out hover:bg-secondary hover:text-primary"
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden sm:inline-flex">{languageLink}</span>
          <Button
            nativeButton={false}
            className="hidden h-10 rounded-full px-5 sm:inline-flex"
            render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
          >
            {t.book}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls={open ? 'mobile-nav' : undefined}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? t.menuClose : t.menuOpen}</span>
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.mainMenu} className="border-t border-border/60 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block py-3 text-base text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-2 pb-3 sm:hidden">
              <span>{languageLink}</span>
              <Button
                nativeButton={false}
                className="h-11 w-full rounded-full"
                render={<a href={salon.bookingUrl} target="_blank" rel="noopener noreferrer" />}
              >
                {t.book}
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
