import type { Lang } from '@/lib/i18n'

// Web3Forms delivers every message to the inbox the access key was registered
// with. Extra CC inboxes are a Web3Forms Pro feature: the free plan rejects a
// submission that includes them, so keep this empty unless the plan is upgraded.
export const ccRecipients: string[] = []

export const contactTopics = [
  { id: 'general', label: { fi: 'Yleinen kysymys', en: 'General question' } },
  { id: 'booking', label: { fi: 'Ajanvaraus', en: 'Booking' } },
  { id: 'services', label: { fi: 'Palvelut & hinnat', en: 'Services & prices' } },
  { id: 'training', label: { fi: 'Koulutukset', en: 'Training courses' } },
  { id: 'giftcards', label: { fi: 'Lahjakortit', en: 'Gift cards' } },
  { id: 'other', label: { fi: 'Muu asia', en: 'Something else' } },
] as const satisfies readonly { id: string; label: Record<Lang, string> }[]

export type ContactTopic = (typeof contactTopics)[number]['id']
