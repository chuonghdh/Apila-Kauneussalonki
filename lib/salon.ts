import type { Lang } from '@/lib/i18n'

export const salon = {
  name: 'Apila Kauneussalonki',
  bookingUrl: 'https://varaa.timma.fi/apilakauneussalonki',
  phoneDisplay: '+358 44 923 9437',
  phoneHref: 'tel:+358449239437',
  email: 'apilakauneussalonki@gmail.com',
  street: 'Vihinkuja 1 A 27',
  city: '33820 Tampere',
  postalCode: '33820',
  town: 'Tampere',
  openingHours: 'Mo-Su 09:00-22:00',
  instagramHandle: 'apila_kauneussalonki',
  instagramUrl: 'https://www.instagram.com/apila_kauneussalonki',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61561872403109',
  mapsUrl: 'https://maps.app.goo.gl/Yudp8hN66zDMJFVg9',
}

type Localized = Record<Lang, string>

export type Service = {
  name: Localized
  duration: Localized
  price: number
  description?: Localized
}
export type ServiceCategory = {
  id: string
  title: Localized
  description: Localized
  image: string
  services: Service[]
}

// Source: hinnasto.png (customer price list). Finnish is the original wording;
// English is a translation and should be checked before publishing.
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'lashes-brows',
    title: { fi: 'Ripset & kulmat', en: 'Lashes & brows' },
    description: {
      fi: 'Ripset ja kulmat muotoillaan ja värjätään kauniisti, luonnolliseen ilmeeseen.',
      en: 'Lashes and brows shaped and tinted for a natural, lasting look.',
    },
    image: '/images/lashes.webp',
    services: [
      {
        name: { fi: 'Ripsien värjäys', en: 'Lash tint' },
        duration: { fi: '~15 min', en: '~15 min' },
        price: 9,
        description: { fi: 'Ripsien värjäys kestovärillä.', en: 'Lash tint with long-lasting colour.' },
      },
      {
        name: { fi: 'Kulmien värjäys ja muotoilu', en: 'Brow tint & shaping' },
        duration: { fi: '~15 min', en: '~15 min' },
        price: 9,
        description: { fi: 'Kulmien muotoilu ja värjäys kestovärillä.', en: 'Brow shaping and long-lasting tint.' },
      },
      {
        name: { fi: 'Ripsien ja kulmien värjäys ja muotoilu', en: 'Lash & brow tint and shaping' },
        duration: { fi: '~30 min', en: '~30 min' },
        price: 18,
        description: {
          fi: 'Ripsien ja kulmien värjäys kestovärillä sekä kulmien muotoilu.',
          en: 'Lash and brow tint with long-lasting colour, plus brow shaping.',
        },
      },
      {
        name: { fi: 'Ripsien kestotaivutus & värjäys', en: 'Lash lift & tint' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 48,
        description: {
          fi: 'Ripsien kestotaivutus ja värjäys. Kestotaivutus pysyy ripsissä noin 4–8 viikkoa.',
          en: 'Lash lift and tint. The lift lasts about 4–8 weeks.',
        },
      },
      {
        name: { fi: 'Ripsihuolto klassinen', en: 'Lash refill, classic' },
        duration: { fi: '~1 t', en: '~1 h' },
        price: 40,
        description: {
          fi: 'Ripsihuolto klassisille ripsienpidennyksille, väh. kolmasosa ripsistä jäljellä.',
          en: 'Refill for classic lash extensions, when at least a third of the extensions remain.',
        },
      },
      {
        name: { fi: 'Ripsienpidennys klassinen', en: 'Lash extensions, classic' },
        duration: { fi: '~2 t', en: '~2 h' },
        price: 60,
        description: {
          fi: 'Klassisessa ripsienpidennyksessä jokaiseen omaan ripseen kiinnitetään yksi ripsikuitu.',
          en: 'One extension is attached to each natural lash.',
        },
      },
      {
        name: { fi: 'Ripsienpidennys volyymi', en: 'Lash extensions, volume' },
        duration: { fi: '~2 t', en: '~2 h' },
        price: 70,
        description: {
          fi: 'Volyymiripsienpidennyksessä jokaiseen omaan ripseen kiinnitetään useampi ripsikuitu viuhkana.',
          en: 'Several fine extensions are fanned onto each natural lash.',
        },
      },
      {
        name: { fi: 'Ripsihuolto volyymi', en: 'Lash refill, volume' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 50,
        description: {
          fi: 'Ripsihuolto volyymipidennyksille, väh. kolmasosa ripsistä jäljellä.',
          en: 'Refill for volume lash extensions, when at least a third of the extensions remain.',
        },
      },
      {
        name: { fi: 'Ripsienpidennys Hybridi', en: 'Lash extensions, hybrid' },
        duration: { fi: '~2 t', en: '~2 h' },
        price: 70,
      },
      {
        name: { fi: 'Ripsihuolto hybridi', en: 'Lash refill, hybrid' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 50,
      },
      {
        name: { fi: 'Ripsienpidennys wispy', en: 'Lash extensions, wispy' },
        duration: { fi: '~2 t', en: '~2 h' },
        price: 80,
        description: {
          fi: 'Wispy-volyymiripsienpidennyksessä jokaiseen omaan ripseen kiinnitetään useampi ripsikuitu viuhkana.',
          en: 'Wispy volume: several fine extensions are fanned onto each natural lash.',
        },
      },
      {
        name: { fi: 'Ripsihuolto wispy', en: 'Lash refill, wispy' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 60,
      },
      {
        name: { fi: 'Ripsienpidennys megavolyymi', en: 'Lash extensions, mega volume' },
        duration: { fi: '~2 t', en: '~2 h' },
        price: 80,
        description: {
          fi: 'Megavolyymiripsienpidennyksessä jokaiseen omaan ripseen kiinnitetään useampi ripsikuitu viuhkana.',
          en: 'Mega volume: several fine extensions are fanned onto each natural lash.',
        },
      },
      {
        name: { fi: 'Ripsihuolto megavolyymi', en: 'Lash refill, mega volume' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 60,
        description: {
          fi: 'Ripsihuolto megavolyymipidennyksille, väh. kolmasosa ripsistä jäljellä.',
          en: 'Refill for mega volume lash extensions, when at least a third of the extensions remain.',
        },
      },
      {
        name: { fi: 'Ripsien kestotaivutus', en: 'Lash lift' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 40,
        description: {
          fi: 'Ripsien kestotaivutus pysyy ripsissä noin 4–8 viikkoa.',
          en: 'The lift lasts about 4–8 weeks.',
        },
      },
      {
        name: { fi: 'Pidennysten poisto', en: 'Extension removal' },
        duration: { fi: '~30 min', en: '~30 min' },
        price: 20,
        description: { fi: 'Ripsienpidennysten poisto.', en: 'Removal of lash extensions.' },
      },
    ],
  },
  {
    id: 'facials',
    title: { fi: 'Kasvohoidot', en: 'Facials' },
    description: {
      fi: 'Puhdistavat ja kosteuttavat kasvohoidot, jotka palauttavat ihon luonnollisen hehkun.',
      en: 'Cleansing and hydrating facials that restore your skin’s natural glow.',
    },
    image: '/images/facial.webp',
    services: [
      {
        name: { fi: 'Kasvohoito', en: 'Facial' },
        duration: { fi: '~1 t', en: '~1 h' },
        price: 60,
        description: {
          fi: 'Alkupuhdistus, kuorinta ja meridiaanihieronta, kiinteyttävä essenssi, essence-naamio. Enimmäiskesto 60 minuuttia.',
          en: 'Cleansing, exfoliation and meridian massage, firming essence, essence mask. Maximum 60 minutes.',
        },
      },
      {
        name: { fi: 'Täydellinen kasvohoito', en: 'Complete facial' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 70,
        description: {
          fi: 'Alkupuhdistus, kuorinta, kulmien muotoilu, höyryttäminen, mustapäiden poisto ja meridiaanihieronta, kiinteyttävä essenssi, essence-naamio.',
          en: 'Cleansing, exfoliation, brow shaping, steaming, blackhead removal and meridian massage, firming essence, essence mask.',
        },
      },
      {
        name: { fi: 'Mustapäiden poistohoito', en: 'Blackhead treatment' },
        duration: { fi: '~1 t', en: '~1 h' },
        price: 50,
        description: {
          fi: 'Tehokas hoito mustapäiden ja tukkeutuneiden ihohuokosten poistamiseen. Hoito auttaa puhdistamaan ihoa, vähentämään epäpuhtauksia ja jättää ihon raikkaaksi ja sileäksi.',
          en: 'An effective treatment for blackheads and clogged pores. It helps cleanse the skin, reduce impurities and leave it fresh and smooth.',
        },
      },
    ],
  },
  {
    id: 'hands-nails',
    title: { fi: 'Kädet & kynnet', en: 'Hands & nails' },
    description: {
      fi: 'Huolellinen käsi- ja kynsihoito, jossa yhdistyvät kosteus, hellä hieronta ja kauniit lakkaukset.',
      en: 'Careful hand and nail care with moisture, gentle massage and beautiful polish.',
    },
    image: '/images/hands-feet.webp',
    services: [
      {
        name: { fi: 'Geelilakkaus uudet', en: 'Gel polish, new nails' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 35,
        description: {
          fi: 'Geelilakkaus antaa upean ja kestävän lakan. Ei sisällä vanhan geelilakan poistoa.',
          en: 'Gel polish with a beautiful, long-lasting finish. Does not include removal of old gel polish.',
        },
      },
      {
        name: { fi: 'Käsihoito', en: 'Manicure' },
        duration: { fi: '~1 t', en: '~1 h' },
        price: 30,
        description: {
          fi: 'Kynsien viilaus, kynsinauhojen siistiminen, hieronta ja lakkaus. Ei sisällä vanhan geelilakan poistoa.',
          en: 'Nail filing, cuticle tidying, massage and polish. Does not include removal of old gel polish.',
        },
      },
      {
        name: { fi: 'Spa-käsihoito', en: 'Spa manicure' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 35,
        description: {
          fi: 'Käsien kuorinta, käsihieronta, rasvaus, kynsinauhojen hoito sekä kynsien muotoilu ja lakkaus. Ei sisällä vanhan geelilakan poistoa.',
          en: 'Hand exfoliation, hand massage, moisturising, cuticle care, nail shaping and polish. Does not include removal of old gel polish.',
        },
      },
      {
        name: { fi: 'Spa ja Geelilakkaus uudet', en: 'Spa manicure & gel polish, new nails' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 45,
        description: {
          fi: 'Käsien kuorinta, käsihieronta, rasvaus, kynsinauhojen hoito sekä kynsien muotoilu ja geelilakkaus.',
          en: 'Hand exfoliation, hand massage, moisturising, cuticle care, nail shaping and gel polish.',
        },
      },
      {
        name: { fi: 'Geelikynnet uudet', en: 'Gel nails, new' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 35,
        description: {
          fi: 'Geelilakkaus antaa upean ja kestävän lakan kynsille. Ei sisällä vanhan geelilakan poistoa. Lakkatekniikka tekee kynsistä kestäviä eikä helposti halkeile.',
          en: 'Gel polish with a beautiful, long-lasting finish on natural nails. Does not include removal of old gel polish. The technique makes nails durable and less prone to breaking.',
        },
      },
    ],
  },
  {
    id: 'feet',
    title: { fi: 'Jalkahoidot', en: 'Feet' },
    description: {
      fi: 'Hemmotteleva jalkahoito, joka pehmentää jalat ja rentouttaa koko kehon.',
      en: 'Pampering foot care that softens the feet and relaxes the whole body.',
    },
    // Photo: Toranong Mahachai, Unsplash (https://unsplash.com/photos/xugoOgRPngU)
    image: '/images/foot-care.webp',
    services: [
      {
        name: { fi: 'Jalkahoito', en: 'Pedicure' },
        duration: { fi: '~1 t', en: '~1 h' },
        price: 45,
        description: {
          fi: 'Kylpy, kovettumien poisto, kynsien leikkaus, kynsinauhojen ja ongelmakohtien hoito, hieronta sekä voide ja kynsien lakkaus. Ei sisällä vanhan geelilakan poistoa.',
          en: 'Foot bath, callus removal, nail trimming, cuticle and problem-area care, massage with lotion and polish. Does not include removal of old gel polish.',
        },
      },
      {
        name: { fi: 'Spa-jalkahoito', en: 'Spa pedicure' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 50,
        description: {
          fi: 'Kylpy, kuorinta, kovettumien poisto, kynsien leikkaus, kynsinauhojen ja ongelmakohtien hoito, hieronta sekä voide ja kynsien lakkaus. Ei sisällä vanhan geelilakan poistoa.',
          en: 'Foot bath, exfoliation, callus removal, nail trimming, cuticle and problem-area care, massage with lotion and polish. Does not include removal of old gel polish.',
        },
      },
      {
        name: { fi: 'Jalkahoito ja Geelilakkaus Varvas uudet', en: 'Pedicure & gel polish, new toes' },
        duration: { fi: '~1 t 30 min', en: '~1 h 30 min' },
        price: 60,
      },
      {
        name: { fi: 'Spa jalkahoito ja Geelilakkaus varvas uudet', en: 'Spa pedicure & gel polish, new toes' },
        duration: { fi: '~1 t 30 min', en: '~1 h 30 min' },
        price: 65,
      },
      {
        name: { fi: 'Varpaankynsien geelilakkaus uudet', en: 'Gel polish, new toes' },
        duration: { fi: '~1 t', en: '~1 h' },
        price: 35,
        description: {
          fi: 'Kynsien ja kynsinauhojen hoito, rasvaus ja kestävä geelilakkaus.',
          en: 'Nail and cuticle care, moisturising and long-lasting gel polish.',
        },
      },
      {
        name: { fi: 'Varpaankynsien geelilakkaus huolto', en: 'Gel polish refill, toes' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 40,
        description: {
          fi: 'Kynsien ja kynsinauhojen hoito, öljyäminen ja kestävä geelilakka. Sisältää vanhan geelilakan poiston.',
          en: 'Nail and cuticle care, oiling and long-lasting gel polish. Includes removal of old gel polish.',
        },
      },
      {
        name: { fi: 'Luxury Jalkahoito', en: 'Luxury pedicure' },
        duration: { fi: '~1 t 30 min', en: '~1 h 30 min' },
        price: 70,
        description: {
          fi: 'Ylellinen spa-jalkahoito: ruusuinen yrttijalkakylpy, kuorinta, kovettumien ja kynsien hoito sekä rentouttava jalkahieronta lämpimällä aromakynttiläöljyllä. Viimeistellään kynsilakkauksella.',
          en: 'A luxurious spa pedicure: rose herbal foot bath, exfoliation, callus and nail care, and a relaxing foot massage with warm aromatic candle oil. Finished with nail polish.',
        },
      },
      {
        name: { fi: 'Luxury Jalkahoito + Geelilakkaus', en: 'Luxury pedicure & gel polish' },
        duration: { fi: '~1 t 45 min', en: '~1 h 45 min' },
        price: 85,
        description: {
          fi: 'Ylellinen spa-jalkahoito: ruusuinen yrttijalkakylpy, kuorinta, kovettumien ja kynsien hoito sekä rentouttava jalkahieronta lämpimällä aromakynttiläöljyllä. Viimeistellään kestävällä geelilakkauksella.',
          en: 'A luxurious spa pedicure: rose herbal foot bath, exfoliation, callus and nail care, and a relaxing foot massage with warm aromatic candle oil. Finished with long-lasting gel polish.',
        },
      },
    ],
  },
  {
    id: 'classic-massage',
    title: { fi: 'Klassinen hieronta', en: 'Classic massage' },
    description: {
      fi: 'Rentouttava päähieronta sekä lihaksia monipuolisesti muokkaava klassinen hieronta.',
      en: 'A relaxing head massage, plus classic massage that works the muscles in varied ways.',
    },
    image: '/images/massage.webp',
    services: [
      {
        name: { fi: 'Päähieronta', en: 'Head massage' },
        duration: { fi: '~45 min', en: '~45 min' },
        price: 40,
        description: {
          fi: 'Päähieronta rentouttaa, vähentää stressiä, vähentää niska- ja hartiakipuja (40 minuuttia).',
          en: 'Relaxing; reduces stress and neck and shoulder pain (40 minutes).',
        },
      },
      {
        name: { fi: 'Klassinen hieronta (60 min)', en: 'Classic massage (60 min)' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 65,
        description: {
          fi: 'Klassinen hieronta on lihaksia monipuolisesti muokkaavaa ja rentouttavaa hierontaa.',
          en: 'Classic massage that works the muscles in varied ways and relaxes the body.',
        },
      },
      {
        name: { fi: 'Klassinen hieronta (90 min)', en: 'Classic massage (90 min)' },
        duration: { fi: '~1 t 45 min', en: '~1 h 45 min' },
        price: 95,
        description: {
          fi: 'Klassinen hieronta on lihaksia monipuolisesti muokkaavaa ja rentouttavaa hierontaa.',
          en: 'Classic massage that works the muscles in varied ways and relaxes the body.',
        },
      },
    ],
  },
  {
    id: 'hot-stone',
    title: { fi: 'Kuumakivihieronta', en: 'Hot stone massage' },
    description: {
      fi: 'Lämpimät kivet ja rauhoittava hieronta vapauttavat jännitykset ja tuovat syvän rentoutumisen.',
      en: 'Warm stones and soothing massage release tension and bring deep relaxation.',
    },
    // Photo: engin akyurt, Unsplash (https://unsplash.com/photos/ZbzYDboN7fg)
    image: '/images/hot-stone.webp',
    services: [
      {
        name: { fi: 'Kuumakivihieronta (90 min)', en: 'Hot stone massage (90 min)' },
        duration: { fi: '~1 t 45 min', en: '~1 h 45 min' },
        price: 120,
        description: {
          fi: 'Lievittää stressiä ja väsymystä, parantaa verenkiertoa, lievittää lihaskipua ja arkuutta sekä parantaa unen laatua.',
          en: 'Relieves stress and tiredness, improves circulation, eases muscle pain and tenderness, and improves sleep quality.',
        },
      },
      {
        name: { fi: 'Kuumakivihieronta (75 min)', en: 'Hot stone massage (75 min)' },
        duration: { fi: '~1 t 30 min', en: '~1 h 30 min' },
        price: 90,
        description: {
          fi: 'Lievittää stressiä ja väsymystä, parantaa verenkiertoa, lievittää lihaskipua ja arkuutta sekä parantaa unen laatua.',
          en: 'Relieves stress and tiredness, improves circulation, eases muscle pain and tenderness, and improves sleep quality.',
        },
      },
      {
        name: { fi: 'Kuumakivihieronta (60 min)', en: 'Hot stone massage (60 min)' },
        duration: { fi: '~1 t 15 min', en: '~1 h 15 min' },
        price: 75,
      },
    ],
  },
]
