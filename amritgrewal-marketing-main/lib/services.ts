/**
 * The service catalogue. This drives the header/footer navigation, the
 * homepage "Our services" section, the quote form's product picker and the
 * sitemap — add a service here and it appears everywhere automatically.
 *
 * This list is deliberately kept in sync, slug for slug, with the sibling CRM
 * so a product picked on the website matches a product row in the CRM. Do not
 * rename or reorder the slugs without updating both.
 */

export type CategoryKey = 'personal' | 'business' | 'travel'

export type Category = {
  key: CategoryKey
  title: string
  blurb: string
  icon: string
}

export type Service = {
  slug: string
  name: string
  /** Short label for tight spaces like the nav and the quote form. */
  shortName: string
  category: CategoryKey
  icon: string
  /** One or two lines used on the service card. */
  summary: string
  /** Concrete, non-fabricated points shown as a checklist on the card. */
  highlights: string[]
}

export const CATEGORIES: Category[] = [
  {
    key: 'personal',
    title: 'Personal Insurance',
    blurb: 'Coverage for your vehicle and your home.',
    icon: 'shield',
  },
  {
    key: 'business',
    title: 'Business & Commercial',
    blurb: 'Protection built around how your business actually operates.',
    icon: 'building',
  },
  {
    key: 'travel',
    title: 'Travel & Visitors',
    blurb: 'Medical coverage for Super Visa applicants and Canadians travelling abroad.',
    icon: 'plane',
  },
]

export const SERVICES: Service[] = [
  // ─── Personal Insurance ────────────────────────────────────────────────────
  {
    slug: 'auto-insurance',
    name: 'Auto Insurance',
    shortName: 'Auto',
    category: 'personal',
    icon: 'car',
    summary:
      'Coverage for your vehicle that meets Ontario’s legal requirements and protects you well beyond the minimum.',
    highlights: [
      'Meets Ontario’s mandatory minimum liability coverage of $200,000',
      'Third-party liability, collision and comprehensive coverage options',
      'Accident benefits for medical care and income replacement after a collision',
      'Coverage for uninsured and underinsured motorists',
      'Multi-vehicle and bundling discounts available when you insure more than one vehicle or combine auto with home',
      'Support after a claim, not just at renewal',
    ],
  },
  {
    slug: 'home-insurance',
    name: 'Home Insurance',
    shortName: 'Home',
    category: 'personal',
    icon: 'home',
    summary:
      'Protection for your house, condo or rental — sized to what it would actually cost to rebuild and replace.',
    highlights: [
      'Dwelling coverage to rebuild your home if it is damaged or destroyed',
      'Contents coverage for your belongings, inside and outside the home',
      'Personal liability protection if someone is injured on your property',
      'Additional living expenses if you are temporarily displaced from your home',
      'Tenant, condo and landlord policies for renters, condo owners and rental property owners',
      'Optional coverage for water damage, sewer backup and other add-ons',
    ],
  },

  // ─── Business & Commercial ─────────────────────────────────────────────────
  {
    slug: 'business-insurance',
    name: 'Business Insurance',
    shortName: 'Business',
    category: 'business',
    icon: 'briefcase',
    summary:
      'Coverage sized to a small or growing business, protecting what a single claim could otherwise put at risk.',
    highlights: [
      'General liability coverage for third-party injury or property damage claims',
      'Commercial property coverage for your building, equipment and inventory',
      'Business interruption coverage to help replace income after a covered loss',
      'Professional liability options for service-based businesses',
      'Coverage sized to your industry and how the business actually operates',
      'Help putting a policy in place before a contract or lease requires proof of insurance',
    ],
  },
  {
    slug: 'commercial-insurance',
    name: 'Commercial Insurance',
    shortName: 'Commercial',
    category: 'business',
    icon: 'building',
    summary:
      'Broader commercial coverage for larger operations, fleets and more complex risk.',
    highlights: [
      'Commercial auto and fleet coverage for vehicles used in the business',
      'Commercial property coverage for larger or multi-location operations',
      'General and product liability for higher-risk or higher-volume operations',
      'Umbrella and excess liability coverage above your primary limits',
      'Coverage that scales as the business adds vehicles, staff or locations',
      'Help understanding what a landlord, lender or contract actually requires',
    ],
  },

  // ─── Travel & Visitors ──────────────────────────────────────────────────────
  {
    slug: 'super-visa-insurance',
    name: 'Super Visa Insurance',
    shortName: 'Super Visa',
    category: 'travel',
    icon: 'passport',
    summary:
      'The medical insurance IRCC requires before parents and grandparents can be approved for a Super Visa.',
    highlights: [
      'Meets IRCC’s minimum of $100,000 in emergency medical coverage, valid for at least one year',
      'Pre-existing conditions considered by many plans after a qualifying stability period',
      'Full refund of the premium if the Super Visa application is refused',
      'Monthly payment plans available instead of a single annual premium',
      'Partial refund if your parents or grandparents return home early with no claim made',
      'Deductible options that can lower the premium',
    ],
  },
  {
    slug: 'travel-insurance',
    name: 'Travel Insurance',
    shortName: 'Travel',
    category: 'travel',
    icon: 'plane',
    summary:
      'Cover for Canadians travelling abroad, and for visitors to Canada, when provincial health care does not apply.',
    highlights: [
      'Emergency medical coverage for hospital care, physician fees and prescriptions abroad',
      'Trip cancellation and interruption coverage for prepaid, non-refundable costs',
      'Emergency air transport and medical repatriation',
      'Annual multi-trip plans for frequent travellers',
      'Coverage for visitors to Canada, who are not covered by provincial health insurance',
      'Pre-existing condition coverage available on many plans',
    ],
  },
]

// ── Lookups ──────────────────────────────────────────────────────────────────

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function servicesByCategory(key: CategoryKey): Service[] {
  return SERVICES.filter((s) => s.category === key)
}
