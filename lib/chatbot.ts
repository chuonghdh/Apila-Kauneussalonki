import { dictionaries, type Lang } from '@/lib/i18n'
import { salon, serviceCategories, type ServiceCategory } from '@/lib/salon'

// Rule-based chat flow. Facts (prices, hours, address, offers) come from the
// site data so the bot never drifts from what the page shows.

type Text = Record<Lang, string>

export type NodeId =
  | 'main'
  | 'booking'
  | 'services'
  | 'facials'
  | 'massage'
  | 'feet'
  | 'hours'
  | 'faq'
  | 'cancel'
  | 'gelRemoval'
  | 'lashRefill'
  | 'offers'
  | 'training'
  | 'contact'

export type ChatIcon = 'calendar' | 'phone' | 'mail' | 'whatsapp' | 'map' | 'list'

export type ChatAction =
  | { kind: 'node'; to: NodeId; label: Text }
  | { kind: 'link'; href: string; label: Text; icon: ChatIcon; external?: boolean; closesChat?: boolean }

export type ChatNode = {
  text: Text[]
  list?: { label: Text; value: Text }[]
  actions: ChatAction[]
}

const fi = dictionaries.fi
const en = dictionaries.en

const price = (p: number): Text => ({ fi: `${p} €`, en: `€${p}` })
const fromPrice = (p: number): Text => ({ fi: `alkaen ${p} €`, en: `from €${p}` })

function category(id: string): ServiceCategory {
  const found = serviceCategories.find((c) => c.id === id)
  if (!found) throw new Error(`Unknown service category: ${id}`)
  return found
}

const serviceList = (...ids: string[]) =>
  ids.flatMap((id) => category(id).services).map((s) => ({ label: s.name, value: price(s.price) }))

const link = {
  book: {
    kind: 'link',
    href: salon.bookingUrl,
    external: true,
    icon: 'calendar',
    label: { fi: 'Varaa aika verkossa', en: 'Book online' },
  },
  call: {
    kind: 'link',
    href: salon.phoneHref,
    icon: 'phone',
    label: { fi: `Soita ${salon.phoneDisplay}`, en: `Call ${salon.phoneDisplay}` },
  },
  whatsapp: {
    kind: 'link',
    href: salon.whatsappUrl,
    external: true,
    icon: 'whatsapp',
    label: { fi: 'WhatsApp', en: 'WhatsApp' },
  },
  email: {
    kind: 'link',
    href: `mailto:${salon.email}`,
    icon: 'mail',
    label: { fi: 'Lähetä sähköpostia', en: 'Send an email' },
  },
  maps: {
    kind: 'link',
    href: salon.mapsUrl,
    external: true,
    icon: 'map',
    label: { fi: 'Avaa Google Mapsissa', en: 'Open in Google Maps' },
  },
  pricing: {
    kind: 'link',
    href: '#services',
    closesChat: true,
    icon: 'list',
    label: { fi: 'Katso koko hinnasto', en: 'See the full price list' },
  },
} satisfies Record<string, ChatAction>

const toNode = (to: NodeId, label: Text): ChatAction => ({ kind: 'node', to, label })

const backToServices = toNode('services', { fi: 'Takaisin palveluihin', en: 'Back to services' })
const backToFaq = toNode('faq', { fi: 'Takaisin kysymyksiin', en: 'Back to questions' })

const [advanceOffer, giftOffer] = [0, 1].map((i) => ({ fi: fi.offers.items[i], en: en.offers.items[i] }))

export const chatNodes: Record<NodeId, ChatNode> = {
  main: {
    text: [
      {
        fi: 'Hei ja tervetuloa Apila Kauneussalonkiin! Miten voin auttaa?',
        en: 'Hi and welcome to Apila Kauneussalonki! How can I help?',
      },
    ],
    actions: [
      toNode('booking', { fi: 'Ajanvaraus', en: 'Booking' }),
      toNode('services', { fi: 'Palvelut & hinnat', en: 'Services & prices' }),
      toNode('hours', { fi: 'Aukioloajat & sijainti', en: 'Hours & location' }),
      toNode('faq', { fi: 'Peruutus & usein kysyttyä', en: 'Cancellation & FAQ' }),
      toNode('contact', { fi: 'Ota yhteyttä', en: 'Contact us' }),
    ],
  },

  booking: {
    text: [
      {
        fi: `Voit varata ajan helposti verkossa. Voit myös soittaa meille numeroon ${salon.phoneDisplay}.`,
        en: `You can book easily online, or call us on ${salon.phoneDisplay}.`,
      },
      {
        fi: `${advanceOffer.fi.text} ${fi.offers.terms}`,
        en: `${advanceOffer.en.text} ${en.offers.terms}`,
      },
    ],
    actions: [link.book, link.call, toNode('hours', { fi: 'Aukioloajat & osoite', en: 'Hours & address' })],
  },

  services: {
    text: [{ fi: 'Tässä hoitomme ja hinnat:', en: 'Here are our treatments and prices:' }],
    list: serviceCategories.map((c) => ({
      label: c.title,
      value: fromPrice(Math.min(...c.services.map((s) => s.price))),
    })),
    actions: [
      toNode('facials', { fi: 'Kasvohoidot', en: 'Facials' }),
      toNode('massage', { fi: 'Hieronnat', en: 'Massage' }),
      toNode('feet', { fi: 'Jalkahoidot', en: 'Foot care' }),
      link.pricing,
      link.book,
    ],
  },

  facials: {
    text: [
      {
        fi: 'Kasvohoitomme puhdistavat, kosteuttavat ja palauttavat ihon hehkun.',
        en: 'Our facials cleanse, hydrate and bring back your skin’s glow.',
      },
    ],
    list: serviceList('facials'),
    actions: [link.book, link.pricing, backToServices],
  },

  massage: {
    text: [
      {
        fi: 'Valitse päähieronnan, klassisen hieronnan ja kuumakivihieronnan väliltä.',
        en: 'Choose from head massage, classic massage and hot stone massage.',
      },
    ],
    list: serviceList('classic-massage', 'hot-stone'),
    actions: [link.book, link.pricing, backToServices],
  },

  feet: {
    text: [
      {
        fi: 'Jalkahoidot kylvystä luxury-hoitoon geelilakkauksella.',
        en: 'Foot care from a simple soak to our luxury pedicure with gel polish.',
      },
    ],
    list: serviceList('feet'),
    actions: [link.book, link.pricing, backToServices],
  },

  hours: {
    text: [
      { fi: `Olemme avoinna ${fi.hours}.`, en: `We are open ${en.hours}.` },
      {
        fi: `Osoite: ${salon.street}, ${salon.city}`,
        en: `Address: ${salon.street}, ${salon.city}`,
      },
    ],
    actions: [link.maps, link.book],
  },

  faq: {
    text: [{ fi: 'Valitse aihe:', en: 'Pick a topic:' }],
    actions: [
      toNode('cancel', { fi: 'Ajan peruutus tai siirto', en: 'Cancelling or moving a booking' }),
      toNode('gelRemoval', { fi: 'Vanhan geelilakan poisto', en: 'Removing old gel polish' }),
      toNode('lashRefill', { fi: 'Ripsihuolto', en: 'Lash refills' }),
      toNode('offers', { fi: 'Tarjoukset & lahjakortit', en: 'Offers & gift cards' }),
      toNode('training', { fi: 'Koulutukset', en: 'Training courses' }),
    ],
  },

  // Generic on purpose: add the salon's exact cancellation rule here once known.
  cancel: {
    text: [
      {
        fi: 'Jos et pääse varattuun aikaan, ilmoitathan siitä mahdollisimman pian, niin voimme tarjota ajan toiselle asiakkaalle.',
        en: 'If you can’t make your appointment, please let us know as early as possible so we can offer the time to someone else.',
      },
      {
        fi: 'Voit perua tai siirtää ajan soittamalla tai lähettämällä sähköpostia.',
        en: 'You can cancel or move your booking by phone or email.',
      },
    ],
    actions: [link.call, link.email, backToFaq],
  },

  gelRemoval: {
    text: [
      {
        fi: 'Useimmat käsi- ja jalkahoidot eivät sisällä vanhan geelilakan poistoa.',
        en: 'Most hand and foot treatments do not include removing old gel polish.',
      },
      {
        fi: 'Varpaankynsien geelilakkauksen huolto sisältää vanhan geelilakan poiston.',
        en: 'The toe gel polish refill does include removing the old gel polish.',
      },
    ],
    actions: [link.pricing, backToFaq],
  },

  lashRefill: {
    text: [
      {
        fi: 'Ripsihuolto edellyttää, että pidennyksistä on jäljellä vähintään kolmasosa. Muuten valitse uusi ripsienpidennys.',
        en: 'A lash refill needs at least a third of your extensions still in place. Otherwise, choose a new set of extensions.',
      },
    ],
    actions: [link.book, link.pricing, backToFaq],
  },

  offers: {
    text: [{ fi: 'Ajankohtaiset tarjouksemme:', en: 'Our current offers:' }],
    list: [advanceOffer, giftOffer].map((o) => ({
      label: { fi: o.fi.title, en: o.en.title },
      value: { fi: o.fi.highlight, en: o.en.highlight },
    })),
    actions: [link.book, backToFaq],
  },

  training: {
    text: [
      { fi: fi.training.lead, en: en.training.lead },
      {
        fi: `${fi.training.priceLabel}: ${fi.training.priceRange}. ${fi.training.priceNote}`,
        en: `${en.training.priceLabel}: ${en.training.priceRange}. ${en.training.priceNote}`,
      },
    ],
    actions: [
      {
        ...link.email,
        href: `mailto:${salon.email}?subject=${encodeURIComponent(fi.training.emailSubject)}`,
        label: { fi: 'Kysy koulutuksista', en: 'Ask about training' },
      },
      link.call,
      backToFaq,
    ],
  },

  contact: {
    text: [{ fi: 'Ota yhteyttä haluamallasi tavalla:', en: 'Get in touch whichever way suits you:' }],
    list: [
      { label: { fi: 'Puhelin', en: 'Phone' }, value: { fi: salon.phoneDisplay, en: salon.phoneDisplay } },
      { label: { fi: 'Sähköposti', en: 'Email' }, value: { fi: salon.email, en: salon.email } },
    ],
    actions: [link.call, link.whatsapp, link.email],
  },
}
