import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Cormorant_Garamond, Poppins } from 'next/font/google'
import { dictionaries, homePath, isLang, languages } from '@/lib/i18n'
import '../globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
})

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = dictionaries[lang].meta
  return {
    title: t.title,
    description: t.description,
    generator: 'v0.app',
    alternates: {
      canonical: homePath[lang],
      languages: { fi: homePath.fi, en: homePath.en },
    },
    openGraph: { title: t.title, description: t.description, locale: lang === 'fi' ? 'fi_FI' : 'en_US' },
  }
}

export const viewport: Viewport = {
  themeColor: '#0b3a2a',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return (
    <html lang={lang} className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
