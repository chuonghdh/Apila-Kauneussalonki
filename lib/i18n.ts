export const languages = ['fi', 'en'] as const
export type Lang = (typeof languages)[number]

export function isLang(value: string): value is Lang {
  return (languages as readonly string[]).includes(value)
}

export const homePath: Record<Lang, string> = { fi: '/', en: '/en' }

const fi = {
  meta: {
    title: 'Apila Kauneussalonki | Kauneushoitola Tampere',
    description:
      'Apila Kauneussalonki Tampereella – kasvohoidot, hieronnat, ripset ja kulmat, käsi- ja jalkahoidot sekä alan koulutukset. Avoinna joka päivä klo 9.00–22.00. Varaa aika verkossa.',
  },
  nav: {
    services: 'Palvelut',
    about: 'Tietoa meistä',
    training: 'Koulutukset',
    offers: 'Tarjoukset',
    contact: 'Yhteystiedot',
    book: 'Varaa aika',
    menuOpen: 'Avaa valikko',
    menuClose: 'Sulje valikko',
    mainMenu: 'Päävalikko',
    home: 'Apila Kauneussalonki – etusivu',
    switchLanguage: 'In English',
  },
  hours: 'Ma–Su klo 9.00–22.00',
  hero: {
    eyebrow: 'Luonnon kauneutta · Tampere',
    titleStart: 'Missä tyylikkyys kohtaa',
    titleEmphasis: 'kohtuuhintaisuuden',
    lead: 'Pakene arjen hälinää rauhalliseen pyhäkköömme. Kasvohoidot, hieronnat, ripset ja kynsienhoito – kaikki räätälöitynä juuri sinun tarpeisiisi.',
    book: 'Varaa aika nyt',
    prices: 'Katso hinnasto',
    imageAlt: 'Kylpylätunnelmaa: pyyhkeitä, kuumia kiviä, kukka ja kynttilöitä',
    badgeLine1: 'alennus',
    badgeLine2: 'ennakkovarauksista',
  },
  services: {
    eyebrow: 'Palvelut & hinnasto',
    title: 'Tutustu palveluihimme',
    lead: 'Edullisia ja korkealaatuisia hoitoja luonnonmukaisilla tuotteilla – hellävaraisesti ja tehokkaasti.',
    book: 'Varaa aika verkossa',
    viewPrices: 'Katso hinnasto',
    hidePrices: 'Piilota hinnasto',
  },
  about: {
    eyebrow: 'Tietoja Apilasta',
    title: 'Tervetuloa rauhoittumaan',
    brand: 'Apila Kauneussalongissa',
    body: 'voit paeta arjen hälinää rauhalliseen pyhäkköömme, joka on suunniteltu virkistämään aistejasi. Täällä voit nauttia erilaisista edullisista ja korkealaatuisista hoidoista, kuten asiantuntevasti asennetuista ripsistä, virkistävistä kasvohoidoista, rauhoittavista hieronnoista ja huolellisesta kynsienhoidosta.',
    logoAlt: 'Apila Kauneussalongin neliapila-logo',
    values: [
      { title: 'Luonnonmukaiset tuotteet', text: 'Hellävaraisia ja tehokkaita tuotteita, jotka kunnioittavat ihoasi.' },
      { title: 'Räätälöidyt hoidot', text: 'Jokainen hoito suunnitellaan juuri sinun tarpeisiisi.' },
      { title: 'Joustavat aukioloajat', text: 'Avoinna joka päivä klo 9.00–22.00 – rentoutuminen sopii kiireisimpäänkin päivään.' },
    ],
  },
  training: {
    eyebrow: 'Koulutukset',
    title: 'Opi alan ammattilaiselta',
    lead: 'Jaamme mielellämme osaamisemme. Tarjoamme käytännönläheisiä koulutuksia niin uusia taitoja hakeville kuin omaa kylpylää tai kauneushoitolaa suunnitteleville.',
    imageAlt: 'Kouluttaja ohjaa opiskelijaa ripsienpidennyksessä hoitohuoneessa',
    programs: [
      {
        title: 'Taitokoulutukset',
        text: 'Käytännön koulutusta esimerkiksi ripsienpidennyksiin, kasvohoitoihin, hierontaan sekä käsi- ja jalkahoitoihin. Pienet ryhmät tai yksityisopetus.',
      },
      {
        title: 'Oman kylpylän avaaminen',
        text: 'Kokonaisvaltainen valmennus oman kylpylän tai kauneushoitolan perustamiseen: tilat, laitteet, tuotteet, palveluvalikoima ja asiakashankinta.',
      },
    ],
    priceLabel: 'Hinta',
    priceRange: '200 € – 2 000 €',
    priceNote: 'Hinta riippuu koulutuksen sisällöstä ja kestosta. Pyydä tarjous!',
    cta: 'Kysy koulutuksista',
    emailSubject: 'Koulutuskysely',
    call: 'Soita',
  },
  offers: {
    eyebrow: 'Tarjoukset',
    title: 'Erikoistarjouksemme',
    lead: 'Nauti ilmaisista kylpylänäytteistä, pienistä herkuista ja teetauosta jokaisen käynnin yhteydessä.',
    items: [
      { highlight: '20%', title: 'Alennus ennakkovarauksista', text: 'Varaa hoitosi etukäteen ja saat 20 % alennuksen kaikista ennakkovarauksista.' },
      { highlight: '3 + 1', title: 'Lahjakorttitarjous', text: 'Osta kolme lahjakorttia, niin saat neljännen ilmaiseksi. Täydellinen lahja läheisille.' },
    ],
    terms: '*Ehdot voimassa.',
    book: 'Varaa aika nyt',
  },
  social: {
    eyebrow: 'Seuraa meitä',
    title: 'Kurkista kulisseihin',
    lead: 'Uusimmat hoidot, ennen–jälkeen-kuvat ja tarjoukset löydät Instagramista ja Facebookista.',
    instagram: 'Seuraa Instagramissa',
    facebook: 'Tykkää Facebookissa',
    reviews: 'Lue arvostelut Googlessa',
  },
  contact: {
    eyebrow: 'Yhteystiedot',
    title: 'Yhteystiedot ja sijaintimme',
    address: 'Osoite',
    phone: 'Puhelin',
    email: 'Sähköposti',
    hours: 'Aukioloajat',
    directions: 'Reittiohjeet Google Mapsissa',
    mapTitle: 'Apila Kauneussalongin sijainti kartalla',
    book: 'Varaa aika',
  },
  footer: {
    tagline: 'Luonnon kauneutta Tampereella.',
    rights: 'Kaikki oikeudet pidätetään.',
  },
}

export type Dictionary = typeof fi

const en: Dictionary = {
  meta: {
    title: 'Apila Beauty Salon | Spa & Beauty Care in Tampere',
    description:
      'Apila Kauneussalonki in Tampere – facials, massage, lashes and brows, manicures, pedicures and professional beauty training. Open daily 9:00–22:00. Book online.',
  },
  nav: {
    services: 'Services',
    about: 'About',
    training: 'Training',
    offers: 'Offers',
    contact: 'Contact',
    book: 'Book now',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    mainMenu: 'Main menu',
    home: 'Apila Beauty Salon – home',
    switchLanguage: 'Suomeksi',
  },
  hours: 'Mon–Sun 9:00–22:00',
  hero: {
    eyebrow: 'Natural beauty · Tampere',
    titleStart: 'Where elegance meets',
    titleEmphasis: 'affordability',
    lead: 'Escape the everyday bustle in our peaceful sanctuary. Facials, massage, lashes and nail care – all tailored to your needs.',
    book: 'Book an appointment',
    prices: 'View prices',
    imageAlt: 'Spa atmosphere: towels, hot stones, a flower and candles',
    badgeLine1: 'off all',
    badgeLine2: 'advance bookings',
  },
  services: {
    eyebrow: 'Services & prices',
    title: 'Explore our services',
    lead: 'Affordable, high-quality treatments using natural products – gentle and effective.',
    book: 'Book online',
    viewPrices: 'View price list',
    hidePrices: 'Hide price list',
  },
  about: {
    eyebrow: 'About Apila',
    title: 'Welcome to unwind',
    brand: 'At Apila Kauneussalonki',
    body: 'you can escape the noise of everyday life in our tranquil sanctuary, designed to refresh your senses. Enjoy a range of affordable, high-quality treatments – expertly applied lashes, revitalising facials, soothing massages and meticulous nail care.',
    logoAlt: 'Apila Beauty Salon four-leaf clover logo',
    values: [
      { title: 'Natural products', text: 'Gentle, effective products that respect your skin.' },
      { title: 'Tailored treatments', text: 'Every treatment is designed around your needs.' },
      { title: 'Flexible hours', text: 'Open daily 9:00–22:00 – relaxation fits into even the busiest day.' },
    ],
  },
  training: {
    eyebrow: 'Training',
    title: 'Learn from a professional',
    lead: 'We love sharing what we know. Our hands-on courses are for anyone building new beauty skills or planning to open their own spa or beauty salon.',
    imageAlt: 'An instructor guiding a student through lash extensions in a treatment room',
    programs: [
      {
        title: 'Skills training',
        text: 'Practical training in lash extensions, facials, massage, manicures and pedicures. Small groups or one-to-one tuition.',
      },
      {
        title: 'Open your own spa',
        text: 'Complete coaching for launching your own spa or beauty salon: premises, equipment, products, service menu and finding clients.',
      },
    ],
    priceLabel: 'Price',
    priceRange: '€200 – €2,000',
    priceNote: 'Pricing depends on course content and length. Ask us for a quote!',
    cta: 'Ask about training',
    emailSubject: 'Training enquiry',
    call: 'Call',
  },
  offers: {
    eyebrow: 'Offers',
    title: 'Our special offers',
    lead: 'Enjoy free spa samples, small treats and a tea break with every visit.',
    items: [
      { highlight: '20%', title: 'Off advance bookings', text: 'Book your treatment ahead of time and get 20% off all advance bookings.' },
      { highlight: '3 + 1', title: 'Gift card offer', text: 'Buy three gift cards and get the fourth one free. The perfect gift for loved ones.' },
    ],
    terms: '*Terms and conditions apply.',
    book: 'Book now',
  },
  social: {
    eyebrow: 'Follow us',
    title: 'Take a peek behind the scenes',
    lead: 'Find our latest treatments, before-and-after photos and offers on Instagram and Facebook.',
    instagram: 'Follow on Instagram',
    facebook: 'Like us on Facebook',
    reviews: 'Read our Google reviews',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Contact & location',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Opening hours',
    directions: 'Get directions on Google Maps',
    mapTitle: 'Apila Beauty Salon location on the map',
    book: 'Book now',
  },
  footer: {
    tagline: 'Natural beauty in Tampere.',
    rights: 'All rights reserved.',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { fi, en }
