import type { Lang } from '@/lib/i18n'

export const salon = {
  name: 'Apila Kauneussalonki',
  bookingUrl: 'https://varaa.timma.fi/apilakauneussalonki',
  phoneDisplay: '+358 44 923 9437',
  phoneHref: 'tel:+358449239437',
  email: 'apilakauneussalonki@gmail.com',
  street: 'Vihinkuja 1 A 27',
  city: '33820 Tampere',
  instagramHandle: 'apila_kauneussalonki',
  instagramUrl: 'https://www.instagram.com/apila_kauneussalonki',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61561872403109',
  mapsUrl: 'https://maps.app.goo.gl/Yudp8hN66zDMJFVg9',
}

type Localized = Record<Lang, string>

export type Service = { name: Localized; detail?: Localized; price: number }
export type ServiceCategory = {
  id: string
  title: Localized
  description: Localized
  image: string
  services: Service[]
}

const classicVolume: Localized = { fi: 'klassinen / volyymi', en: 'classic / volume' }

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'facials',
    title: { fi: 'Kasvohoidot', en: 'Facials' },
    description: {
      fi: 'Puhdistavat ja kosteuttavat hoidot, jotka palauttavat ihon hehkun.',
      en: 'Cleansing and hydrating treatments that bring back your natural glow.',
    },
    image: '/images/facial.png',
    services: [
      { name: { fi: 'Kasvohoito', en: 'Facial' }, price: 60 },
      { name: { fi: 'Täydellinen kasvohoito', en: 'Complete facial' }, price: 70 },
      { name: { fi: 'Kasvohieronta', en: 'Facial massage' }, price: 40 },
    ],
  },
  {
    id: 'massage',
    title: { fi: 'Hieronnat', en: 'Massage' },
    description: {
      fi: 'Rauhoittavat hieronnat, jotka vapauttavat jännitykset ja mielen.',
      en: 'Soothing massages that release tension and quiet the mind.',
    },
    image: '/images/massage.png',
    services: [
      { name: { fi: 'Päähieronta', en: 'Head massage' }, detail: { fi: '45 min', en: '45 min' }, price: 40 },
      { name: { fi: 'Klassinen hieronta', en: 'Classic massage' }, detail: { fi: '60 min', en: '60 min' }, price: 65 },
      { name: { fi: 'Klassinen hieronta', en: 'Classic massage' }, detail: { fi: '90 min', en: '90 min' }, price: 95 },
    ],
  },
  {
    id: 'lashes-brows',
    title: { fi: 'Ripset & kulmat', en: 'Lashes & brows' },
    description: {
      fi: 'Asiantuntevasti asennetut ripset ja kauniisti muotoillut kulmat.',
      en: 'Expertly applied lashes and beautifully shaped brows.',
    },
    image: '/images/lashes.png',
    services: [
      { name: { fi: 'Ripsien värjäys', en: 'Lash tint' }, price: 8 },
      { name: { fi: 'Kulmien värjäys ja muotoilu', en: 'Brow tint & shaping' }, price: 8 },
      { name: { fi: 'Ripsien kestotaivutus', en: 'Lash lift' }, price: 40 },
      { name: { fi: 'Ripsienpidennys', en: 'Lash extensions' }, detail: classicVolume, price: 60 },
      { name: { fi: 'Ripsihuolto', en: 'Lash refill' }, detail: classicVolume, price: 40 },
      { name: { fi: 'Pidennysten poisto', en: 'Extension removal' }, price: 20 },
    ],
  },
  {
    id: 'hands-feet',
    title: { fi: 'Käsi- & jalkahoidot', en: 'Hands & feet' },
    description: {
      fi: 'Huolellinen kynsien ja ihon hoito käsille ja jaloille.',
      en: 'Careful nail and skin care for your hands and feet.',
    },
    image: '/images/hands-feet.png',
    services: [
      { name: { fi: 'Käsihoito', en: 'Manicure' }, price: 40 },
      { name: { fi: 'Spa-käsihoito', en: 'Spa manicure' }, price: 45 },
      { name: { fi: 'Jalkahoito', en: 'Pedicure' }, price: 40 },
      { name: { fi: 'Spa-jalkahoito', en: 'Spa pedicure' }, price: 45 },
    ],
  },
]
