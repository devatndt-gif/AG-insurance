import { ViewTransition } from 'react'
import type { Metadata, Viewport } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PoweredBy } from '@/components/powered-by'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { SITE, CONTACT } from '@/lib/site'

const display = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.advisor} — Auto, Home, Business & Commercial Insurance in Brampton`,
    template: `%s | ${SITE.name} Insurance`,
  },
  description:
    'Amritpal Grewal is a RIBO insurance broker with Diamond Insurance Group in Brampton, licensed in Ontario and Alberta, arranging auto, home, business, commercial, Super Visa and travel insurance.',
  keywords: [
    'auto insurance Brampton',
    'home insurance Ontario',
    'business insurance',
    'commercial insurance',
    'Super Visa insurance',
    'travel insurance Canada',
    'insurance broker Brampton',
    'Diamond Insurance Group',
  ],
  authors: [{ name: SITE.advisor }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE.url,
    siteName: SITE.legalName,
    title: `${SITE.advisor} — ${SITE.promise}`,
    description:
      'Auto, home, business, commercial, Super Visa and travel insurance. Coverage compared across Ontario’s leading insurers.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.advisor,
    description: 'Independent insurance advice for Ontario drivers, homeowners and businesses.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#121316' },
  ],
}

/**
 * Applies the saved (or system) theme while the browser is still parsing the
 * head, so the first paint is already correct. See the Next.js guide on
 * preventing flash before hydration.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(!t)t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: SITE.advisor,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/logo.png`,
  description:
    'Insurance agency in Brampton, Ontario arranging auto, home, business, commercial, Super Visa and travel insurance.',
  founder: { '@type': 'Person', name: SITE.advisor },
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.region,
    addressCountry: 'CA',
  },
  telephone: '+1-905-981-5025',
  email: CONTACT.email,
  areaServed: [
    { '@type': 'State', name: 'Ontario' },
    { '@type': 'State', name: 'Alberta' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORG_JSONLD).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {/* Crossfades page content on navigation. The header and footer stay
            put, so only the body of the page moves. */}
        <main>
          <ViewTransition enter="page-enter" exit="page-exit">{children}</ViewTransition>
        </main>
        <SiteFooter />
        <PoweredBy />
        <WhatsAppButton />
      </body>
    </html>
  )
}
