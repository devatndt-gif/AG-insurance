/**
 * Single source of truth for brand, contact and navigation.
 * Anything that appears in more than one place on the site lives here.
 */

export const SITE = {
  name: 'Amritpal Grewal',
  legalName: 'Diamond Insurance Group',
  tagline: 'Your Risks, Our Concern',
  promise: 'Protecting What Matters Most — Auto, Home, Business & Commercial Insurance',
  subPromise: 'Auto, Home, Business, Commercial, Super Visa and Travel Insurance for Ontario Families and Businesses',
  url: 'https://aginsurance.ca',
  advisor: 'Amritpal Grewal',
} as const

export const CONTACT = {
  phone: '905-981-5025',
  phoneHref: 'tel:+19059815025',
  email: 'agrewal@dig.insure',
  emailHref: 'mailto:agrewal@dig.insure',
  // Same line as the office phone. wa.me takes the number in international
  // format with no '+' or separators; `text` pre-fills the first message.
  whatsappHref: `https://wa.me/19059815025?text=${encodeURIComponent(
    'Hi Amritpal, I would like a quote for insurance.'
  )}`,
  street: 'Unit 209-210, 60 Lacoste Blvd',
  city: 'Brampton',
  region: 'ON',
  regionLong: 'Ontario',
  country: 'Canada',
  addressLine: 'Unit 209-210, 60 Lacoste Blvd, Brampton, Ontario',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM ET',
} as const

/**
 * Public link to the quote form, as encoded in `public/quote-qr.png` / `.svg`.
 * Regenerate both images if this URL ever changes.
 */
const QUOTE_URL = `${SITE.url}/#quote`
const SHARE_TEXT = 'Get a free insurance quote from Amritpal Grewal, Diamond Insurance Group:'

export const SHARE = {
  quoteUrl: QUOTE_URL,
  text: SHARE_TEXT,
  // wa.me with no number opens WhatsApp's contact picker, so the visitor
  // chooses who to send the form link to.
  whatsappHref: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${QUOTE_URL}`)}`,
  qrPng: '/quote-qr.png',
  qrSvg: '/quote-qr.svg',
} as const

/**
 * Credit bar at the foot of every page.
 *
 * `logo` is the path to a wordmark in `public/` once one exists; until then the
 * brand name is set in type. Add the file, point `logo` at it, and the image
 * replaces the text with no other change.
 */
export const POWERED_BY = {
  label: 'Powered by',
  services: [
    {
      name: 'BIZDOMINATE.COM',
      tagline: 'SEO, AEO, AI-Powered CRM & Business Growth',
      href: 'https://www.bizdominate.com/',
      icon: 'growth',
    },
  ],
  /**
   * `slug` is the file name to look for in `public/brand/`. Drop
   * `bizdominate.png` or `neodynatech.svg` in there and the logo replaces the
   * text automatically — see `lib/brand-logos.ts`.
   */
  brands: [
    { slug: 'bizdominate', name: 'bizDominate', href: 'https://www.bizdominate.com/' },
    // No public URL was supplied for NeoDynaTech, so the mark is not linked.
    { slug: 'neodynatech', name: 'NeoDynaTech Solutions Inc.', href: null as string | null },
  ],
} as const

/**
 * Qualitative trust markers shown on the homepage. No specific counts, years
 * or ratings are claimed here — only things that are true without a number
 * attached to them.
 */
export const TRUST = [
  { icon: 'shield', label: 'RIBO Insurance Broker, Licensed in ON and AB' },
  { icon: 'car', label: 'Auto, Home, Business & Commercial' },
  { icon: 'pin', label: 'Local to Brampton' },
  { icon: 'bolt', label: 'Fast, No-Obligation Quotes' },
] as const

export const WHY_US = [
  {
    icon: 'compass',
    title: 'Personalized Guidance',
    body: 'We take the time to understand your vehicles, your property and your business before recommending coverage.',
  },
  {
    icon: 'shield',
    title: 'Expertise You Can Trust',
    body: 'Straightforward advice on auto, home, business and commercial coverage from someone who knows the Ontario market.',
  },
  {
    icon: 'globe',
    title: 'Happy to Work With You',
    body: 'We are happy to work with you however is most comfortable, and we take the time to make sure you understand your coverage.',
  },
  {
    icon: 'bolt',
    title: 'Fast, Hassle-Free Process',
    body: 'We handle the comparisons and the paperwork so you don’t have to.',
  },
  {
    icon: 'layers',
    title: 'Comprehensive Coverage',
    body: 'From your vehicle to your business, you get coverage that is sized to the actual risk, under one roof.',
  },
  {
    icon: 'handshake',
    title: 'Local, Independent Advice',
    body: 'Based in Brampton, we compare coverage across Ontario’s leading insurers to find the right fit for you.',
  },
] as const

/** How an enquiry actually progresses, shown on the homepage. */
export const PROCESS = [
  {
    step: '01',
    title: 'Tell us what you need',
    body: 'A short call or form. We ask about your vehicles, your property or your business, and the risk you want covered.',
  },
  {
    step: '02',
    title: 'We compare the market',
    body: 'We compare coverage across Ontario’s leading insurers and explain the trade-offs in plain language.',
  },
  {
    step: '03',
    title: 'Apply without the paperwork',
    body: 'We complete the application with you, handle the details, and follow up with the insurer for you.',
  },
  {
    step: '04',
    title: 'Reviewed every year',
    body: 'Your needs change. We revisit your coverage at renewal and adjust it as your life or business moves on.',
  },
] as const
