import Link from 'next/link'
import { CATEGORIES, servicesByCategory } from '@/lib/services'
import { SITE, CONTACT } from '@/lib/site'
import { IconClock, IconDiamond, IconMail, IconPhone, IconPin, IconWhatsApp } from './icons'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand footer-logo">
              <span className="brand-leaf">
                <IconDiamond className="brand-gem" aria-hidden="true" />
              </span>
              <span className="brand-word">
                <span className="name">{SITE.name}</span>
                <span className="sub">{SITE.legalName}</span>
              </span>
            </div>
            <p>
              Independent insurance advice for Ontario drivers, homeowners and
              businesses. We compare coverage across leading insurers so you
              don&rsquo;t have to, and explain the difference in plain language.
            </p>
          </div>

          <div>
            <h4>{CATEGORIES[0].title}</h4>
            <ul className="footer-links">
              {servicesByCategory('personal').map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>{s.shortName}</a>
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: 22 }}>{CATEGORIES[2].title}</h4>
            <ul className="footer-links">
              {servicesByCategory('travel').map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>{s.shortName}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{CATEGORIES[1].title}</h4>
            <ul className="footer-links">
              {servicesByCategory('business').map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>{s.shortName}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <div className="footer-contact">
              <a href={CONTACT.phoneHref}>
                <IconPhone />
                <span>{CONTACT.phone}</span>
              </a>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp />
                <span>WhatsApp</span>
              </a>
              <a href={CONTACT.emailHref}>
                <IconMail />
                <span>{CONTACT.email}</span>
              </a>
              <div>
                <IconPin />
                <span>
                  {CONTACT.street}
                  <br />
                  {CONTACT.city}, {CONTACT.regionLong}
                </span>
              </div>
              <div>
                <IconClock />
                <span>{CONTACT.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="disclaimer">
          Disclaimer: this website is intended for residents of Canada and visitors to
          Canada. Coverage descriptions are general summaries and are not a contract of
          insurance. Coverage, eligibility, exclusions and premiums are determined solely
          by the issuing insurer and the policy wording. Quoted rates are estimates; where
          a rate shown here differs from the insurer&rsquo;s own quotation software, the
          insurer&rsquo;s figure prevails.
        </p>
      </div>

      <div className="wrap">
        <div className="footer-bottom">
          <span>
            &copy; {year} {SITE.legalName}. All rights reserved.
          </span>
          <nav aria-label="Legal">
            <a href="#about">About</a>
            <a href="#quote">Contact</a>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
