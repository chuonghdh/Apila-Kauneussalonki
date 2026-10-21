'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import {
  CalendarDays,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  MessageCircleMore,
  Phone,
  RotateCcw,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useContactForm } from '@/components/contact-form'
import { cn } from '@/lib/utils'
import { chatNodes, type ChatAction, type ChatIcon, type NodeId } from '@/lib/chatbot'
import type { ContactTopic } from '@/lib/contact'
import type { Lang } from '@/lib/i18n'

type Text = Record<Lang, string>
type Entry = { id: number; from: 'bot'; node: NodeId } | { id: number; from: 'user'; label: Text }

const actionIcons: Record<ChatIcon, LucideIcon> = {
  calendar: CalendarDays,
  phone: Phone,
  mail: Mail,
  whatsapp: MessageCircleMore,
  map: MapPin,
  list: ListChecks,
}

const ui = {
  title: { fi: 'Apila-avustaja', en: 'Apila assistant' },
  subtitle: { fi: 'Valitse aihe alta', en: 'Pick a topic below' },
  open: { fi: 'Avaa chat', en: 'Open chat' },
  close: { fi: 'Sulje chat', en: 'Close chat' },
  language: { fi: 'Kieli', en: 'Language' },
  mainMenu: { fi: 'Palaa alkuun', en: 'Back to main menu' },
} satisfies Record<string, Text>

const start: Entry[] = [{ id: 0, from: 'bot', node: 'main' }]

export function ChatWidget({ lang: pageLang }: { lang: Lang }) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<Lang>(pageLang)
  const [log, setLog] = useState<Entry[]>(start)
  const nextId = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const openContactForm = useContactForm()

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [log, lang])

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  const go = (to: NodeId, label: Text) => {
    const id = nextId.current
    nextId.current += 2
    setLog((current) => [...current, { id, from: 'user', label }, { id: id + 1, from: 'bot', node: to }])
  }

  const lastBot = [...log].reverse().find((e) => e.from === 'bot')

  return (
    <>
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-label={ui.title[lang]}
        tabIndex={-1}
        inert={!open}
        onKeyDown={(e) => {
          if (e.key === 'Escape') close()
        }}
        className={cn(
          'fixed right-4 bottom-22 z-[60] flex h-[min(36rem,calc(100dvh-7.5rem))] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/60 bg-card/90 shadow-2xl shadow-primary/20 backdrop-blur-xl outline-none transition-[opacity,scale,translate] duration-300 ease-out motion-reduce:transition-none sm:right-6 sm:bottom-24',
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-95 opacity-0',
        )}
      >
        <header className="flex items-center gap-3 bg-forest px-4 py-3.5 text-forest-foreground">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-foreground/10">
            <Image src="/images/clover.png" alt="" width={28} height={28} className="size-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg leading-tight font-semibold">{ui.title[lang]}</p>
            <p className="text-xs text-forest-foreground/70">{ui.subtitle[lang]}</p>
          </div>
          <div
            role="group"
            aria-label={ui.language[lang]}
            className="flex rounded-full border border-forest-foreground/25 p-0.5 text-xs font-medium"
          >
            {(['fi', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={cn(
                  'rounded-full px-2.5 py-1 uppercase transition-colors duration-300',
                  lang === l ? 'bg-forest-foreground text-forest' : 'text-forest-foreground/80 hover:text-forest-foreground',
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={close}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-forest-foreground/80 transition-colors duration-300 hover:bg-forest-foreground/10 hover:text-forest-foreground"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">{ui.close[lang]}</span>
          </button>
        </header>

        <div ref={scrollRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4">
          {log.map((entry) =>
            entry.from === 'user' ? (
              <p
                key={entry.id}
                className="chat-in max-w-[85%] self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground"
              >
                {entry.label[lang]}
              </p>
            ) : (
              <BotMessage
                key={entry.id}
                node={entry.node}
                lang={lang}
                active={entry === lastBot}
                onNode={go}
                onLink={(action) => {
                  if (action.closesChat) setOpen(false)
                }}
                onForm={(topic) => {
                  setOpen(false)
                  openContactForm(topic)
                }}
                onRestart={() => go('main', ui.mainMenu)}
              />
            ),
          )}
        </div>
      </div>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        className="fixed right-4 bottom-4 z-[60] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 shadow-primary/30 ring-white/40 transition-[translate,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:right-6 sm:bottom-6"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <MessageCircle className="size-6" aria-hidden="true" />}
        <span className="sr-only">{open ? ui.close[lang] : ui.open[lang]}</span>
      </button>
    </>
  )
}

function BotMessage({
  node,
  lang,
  active,
  onNode,
  onLink,
  onForm,
  onRestart,
}: {
  node: NodeId
  lang: Lang
  active: boolean
  onNode: (to: NodeId, label: Text) => void
  onLink: (action: Extract<ChatAction, { kind: 'link' }>) => void
  onForm: (topic: ContactTopic) => void
  onRestart: () => void
}) {
  const { text, list, actions } = chatNodes[node]

  return (
    <div className="chat-in flex flex-col gap-2.5">
      <div className="max-w-[92%] self-start rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
        {text.map((p, i) => (
          <p key={i} className={i > 0 ? 'mt-1.5' : undefined}>
            {p[lang]}
          </p>
        ))}
        {list && (
          <ul className="mt-2 flex flex-col gap-1">
            {list.map((item) => (
              <li key={item.label.fi} className="flex items-baseline gap-2">
                <span>{item.label[lang]}</span>
                <span className="flex-1 border-b border-dotted border-primary/25" aria-hidden="true" />
                <span className="shrink-0 font-semibold whitespace-nowrap tabular-nums text-primary">
                  {item.value[lang]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {active && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action) =>
            action.kind === 'node' ? (
              <button
                key={action.to}
                type="button"
                onClick={() => onNode(action.to, action.label)}
                className={optionClass}
              >
                {action.label[lang]}
              </button>
            ) : action.kind === 'form' ? (
              <button
                key={`form-${action.topic}`}
                type="button"
                onClick={() => onForm(action.topic)}
                className={cn(optionClass, filledOptionClass)}
              >
                <Mail className="size-3.5" aria-hidden="true" />
                {action.label[lang]}
              </button>
            ) : (
              <LinkOption key={action.href} action={action} lang={lang} onClick={() => onLink(action)} />
            ),
          )}
          {node !== 'main' && (
            <button type="button" onClick={onRestart} className={cn(optionClass, 'gap-1.5 border-dashed')}>
              <RotateCcw className="size-3.5" aria-hidden="true" />
              {ui.mainMenu[lang]}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function LinkOption({
  action,
  lang,
  onClick,
}: {
  action: Extract<ChatAction, { kind: 'link' }>
  lang: Lang
  onClick: () => void
}) {
  const Icon = actionIcons[action.icon]
  return (
    <a
      href={action.href}
      onClick={onClick}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noopener noreferrer' : undefined}
      className={cn(optionClass, filledOptionClass)}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {action.label[lang]}
    </a>
  )
}

const filledOptionClass = 'gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'

const optionClass =
  'inline-flex items-center rounded-full border border-primary/30 px-3.5 py-2 text-sm font-medium text-primary transition-colors duration-300 ease-out hover:border-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
