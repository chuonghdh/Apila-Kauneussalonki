'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Droplets, Eye, Flame, Footprints, Hand, HandHeart, type LucideIcon, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceCategory } from '@/lib/salon'
import type { Lang } from '@/lib/i18n'

const categoryIcons: Record<string, LucideIcon> = {
  'lashes-brows': Eye,
  'head-massage': Sparkles,
  facials: Droplets,
  'hands-nails': HandHeart,
  feet: Footprints,
  'classic-massage': Hand,
  'hot-stone': Flame,
}

type Labels = { open: string; close: string }

// Only one category can be open at a time: the parent tracks the open id.
export function ServiceCategoryGrid({
  categories,
  lang,
  labels,
}: {
  categories: ServiceCategory[]
  lang: Lang
  labels: Labels
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="mt-14 flex flex-wrap items-start justify-center gap-6">
      {categories.map((category) => (
        <ServiceCategoryCard
          key={category.id}
          category={category}
          lang={lang}
          labels={labels}
          open={openId === category.id}
          onToggle={() => setOpenId((current) => (current === category.id ? null : category.id))}
        />
      ))}
    </div>
  )
}

function ServiceCategoryCard({
  category,
  lang,
  labels,
  open,
  onToggle,
}: {
  category: ServiceCategory
  lang: Lang
  labels: Labels
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  const Icon = categoryIcons[category.id] ?? Droplets

  return (
    <article className="reveal group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 ease-out hover:shadow-lg md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="font-serif text-2xl font-semibold text-primary">{category.title[lang]}</h3>
        </div>
        <p className="min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">{category.description[lang]}</p>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex h-11 w-full items-center justify-between rounded-full border border-border px-5 text-sm font-medium text-primary transition-colors duration-300 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span>{open ? labels.close : labels.open}</span>
          <ChevronDown
            className={cn('size-4 transition-transform duration-500 ease-out', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div id={panelId} inert={!open} className="border-t border-border px-6 pb-6 pt-5 md:px-7">
            <ul className="flex flex-col gap-5">
              {category.services.map((service) => (
                <li key={service.name.fi} className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2 text-sm">
                    <span className="font-medium">{service.name[lang]}</span>
                    <span className="flex-1 border-b border-dotted border-border" aria-hidden="true" />
                    <span className="shrink-0 whitespace-nowrap font-semibold tabular-nums text-primary">
                      {lang === 'en' ? `€${service.price}` : `${service.price} €`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{service.duration[lang]}</p>
                  {service.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.description[lang]}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}
