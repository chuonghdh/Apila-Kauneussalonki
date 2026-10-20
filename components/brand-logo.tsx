import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <Image src="/images/clover.png" alt="" width={40} height={40} className="size-9" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif text-3xl font-medium italic',
            inverted ? 'text-forest-foreground' : 'text-primary',
          )}
        >
          Apila
        </span>
        <span
          className={cn(
            'text-[0.6rem] font-semibold uppercase tracking-[0.25em]',
            inverted ? 'text-leaf' : 'text-leaf-text',
          )}
        >
          Kauneussalonki
        </span>
      </span>
    </span>
  )
}
