import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { About } from '@/components/about'
import { Training } from '@/components/training'
import { Offers } from '@/components/offers'
import { Social } from '@/components/social'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { dictionaries, isLang } from '@/lib/i18n'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = dictionaries[lang]

  return (
    <>
      <SiteHeader lang={lang} t={t.nav} />
      <main>
        <Hero t={t.hero} hours={t.hours} />
        <Services lang={lang} t={t.services} />
        <About t={t.about} />
        <Training t={t.training} />
        <Offers t={t.offers} />
        <Social t={t.social} />
        <Contact t={t.contact} hours={t.hours} />
      </main>
      <SiteFooter t={t.footer} />
    </>
  )
}
