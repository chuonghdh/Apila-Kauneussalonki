'use client'

import { createContext, useCallback, useContext, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Loader2, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ccRecipients, contactTopics, type ContactTopic } from '@/lib/contact'
import { salon } from '@/lib/salon'
import type { Lang } from '@/lib/i18n'

const endpoint = 'https://api.web3forms.com/submit'

const copy = {
  fi: {
    title: 'Ota yhteyttä',
    lead: 'Lähetä meille viesti, niin vastaamme mahdollisimman pian.',
    name: 'Nimi',
    email: 'Sähköposti',
    phone: 'Puhelinnumero (vapaaehtoinen)',
    topic: 'Aihe',
    message: 'Viesti',
    required: 'Puhelinnumeroa lukuun ottamatta kaikki kentät ovat pakollisia.',
    submit: 'Lähetä viesti',
    sending: 'Lähetetään…',
    success: 'Kiitos! Viestisi on lähetetty onnistuneesti. Otamme sinuun yhteyttä mahdollisimman pian.',
    error: `Viestin lähetys epäonnistui. Yritä uudelleen tai soita meille numeroon ${salon.phoneDisplay}.`,
    another: 'Lähetä uusi viesti',
    close: 'Sulje',
  },
  en: {
    title: 'Contact us',
    lead: 'Send us a message and we’ll get back to you as soon as possible.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone number (optional)',
    topic: 'Topic',
    message: 'Message',
    required: 'All fields except the phone number are required.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you! Your message has been sent. We’ll get back to you as soon as possible.',
    error: `Your message could not be sent. Please try again or call us on ${salon.phoneDisplay}.`,
    another: 'Send another message',
    close: 'Close',
  },
} satisfies Record<Lang, Record<string, string>>

type Status = 'idle' | 'sending' | 'success' | 'error'

const ContactFormContext = createContext<((topic?: ContactTopic) => void) | null>(null)

export function useContactForm() {
  const open = useContext(ContactFormContext)
  if (!open) throw new Error('useContactForm must be used inside ContactFormProvider')
  return open
}

export function ContactFormButton({
  topic,
  className,
  children,
}: {
  topic?: ContactTopic
  className?: string
  children: ReactNode
}) {
  const open = useContactForm()
  return (
    <button type="button" onClick={() => open(topic)} className={className}>
      {children}
    </button>
  )
}

// Sent as form data with only an Accept header, so the browser makes a simple
// request: Web3Forms rejects the CORS preflight that a JSON body would trigger.
async function submit(fields: Record<string, string>) {
  const body = new FormData()
  for (const [key, value] of Object.entries(fields)) body.append(key, value)
  const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body })
  const json = await res.json().catch(() => null)
  return res.ok && json?.success === true
}

export function ContactFormProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [topic, setTopic] = useState<ContactTopic>('general')
  const [status, setStatus] = useState<Status>('idle')
  const titleId = useId()
  const t = copy[lang]

  const open = useCallback((next: ContactTopic = 'general') => {
    setTopic(next)
    setStatus((current) => (current === 'sending' ? current : 'idle'))
    dialogRef.current?.showModal()
  }, [])

  const close = () => dialogRef.current?.close()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      console.error('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set')
      setStatus('error')
      return
    }

    const name = String(data.get('name') ?? '').trim()
    const topicLabel = contactTopics.find((x) => x.id === topic)?.label.fi ?? topic
    const payload = {
      access_key: accessKey,
      subject: `Yhteydenotto verkkosivulta: ${topicLabel} – ${name}`,
      from_name: `${salon.name} – verkkosivu`,
      name,
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? '').trim() || '-',
      topic: topicLabel,
      message: String(data.get('message') ?? ''),
      language: lang,
    }

    setStatus('sending')
    try {
      let sent: boolean
      if (ccRecipients.length > 0) {
        sent = await submit({ ...payload, ccemail: ccRecipients.join('; ') })
        // If CC is rejected (e.g. the plan lapsed), still deliver to the main inbox.
        if (!sent) sent = await submit(payload)
      } else {
        sent = await submit(payload)
      }
      if (sent) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <ContactFormContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="dialog-in m-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-3xl border border-white/60 bg-card/95 p-0 text-foreground shadow-2xl shadow-primary/25 backdrop-blur-xl backdrop:bg-forest/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 bg-forest px-6 py-5 text-forest-foreground">
          <div>
            <h2 id={titleId} className="font-serif text-2xl font-semibold">
              {t.title}
            </h2>
            <p className="mt-1 text-sm text-forest-foreground/75">{t.lead}</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-forest-foreground/80 transition-colors duration-300 hover:bg-forest-foreground/10 hover:text-forest-foreground"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.close}</span>
          </button>
        </div>

        <div className="max-h-[calc(100dvh-10rem)] overflow-y-auto p-6">
          {status === 'success' ? (
            <div role="status" className="flex flex-col items-center gap-4 py-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-7" aria-hidden="true" />
              </span>
              <p className="max-w-sm leading-relaxed text-foreground">{t.success}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button type="button" onClick={() => setStatus('idle')} className={secondaryButton}>
                  {t.another}
                </button>
                <button type="button" onClick={close} className={primaryButton}>
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label={t.name} className="sm:col-span-2">
                <input name="name" required autoComplete="name" className={inputClass} />
              </Field>
              <Field label={t.email}>
                <input type="email" name="email" required autoComplete="email" className={inputClass} />
              </Field>
              <Field label={t.phone}>
                <input type="tel" name="phone" autoComplete="tel" className={inputClass} />
              </Field>
              <Field label={t.topic} className="sm:col-span-2">
                <select
                  name="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as ContactTopic)}
                  className={inputClass}
                >
                  {contactTopics.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label[lang]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t.message} className="sm:col-span-2">
                <textarea name="message" required rows={4} className={cn(inputClass, 'h-auto min-h-28 resize-y py-3')} />
              </Field>
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              {status === 'error' && (
                <p role="alert" className="text-sm text-destructive sm:col-span-2">
                  {t.error}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:col-span-2">
                <button type="submit" disabled={status === 'sending'} className={cn(primaryButton, 'w-full')}>
                  {status === 'sending' ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="size-4" aria-hidden="true" />
                  )}
                  {status === 'sending' ? t.sending : t.submit}
                </button>
                <p className="text-center text-xs text-muted-foreground">{t.required}</p>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </ContactFormContext.Provider>
  )
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn('flex flex-col gap-1.5 text-sm font-medium text-foreground', className)}>
      <span>{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'h-11 w-full rounded-xl border border-input bg-background px-4 text-sm font-normal text-foreground transition-colors duration-300 outline-none focus:border-primary focus-visible:ring-3 focus-visible:ring-ring/30'

const primaryButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors duration-300 ease-out hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

const secondaryButton =
  'inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-medium text-primary transition-colors duration-300 ease-out hover:border-primary hover:bg-secondary'
