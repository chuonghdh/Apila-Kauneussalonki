import Image from 'next/image'
import { Clock, HandHeart, Leaf } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

const icons = [Leaf, HandHeart, Clock]

export function About({ t }: { t: Dictionary['about'] }) {
  return (
    <section id="about" className="scroll-mt-20 bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
        <div className="reveal-fade relative mx-auto aspect-square w-full max-w-md">
          <div className="image-sheen absolute inset-0 overflow-hidden rounded-full border-8 border-background shadow-lg [--sheen-delay:4s]">
            <Image
              src="/images/logo.jpg"
              alt={t.logoAlt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="reveal flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf-text">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl font-medium text-balance md:text-5xl">{t.title}</h2>
          <p className="leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-primary">{t.brand}</strong> {t.body}
          </p>
          <ul className="mt-2 flex flex-col gap-5">
            {t.values.map(({ title, text }, i) => {
              const Icon = icons[i] ?? Leaf
              return (
                <li key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
