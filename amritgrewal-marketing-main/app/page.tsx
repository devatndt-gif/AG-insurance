import Image from 'next/image'
import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { Reveal } from '@/components/reveal'
import { StatsBand } from '@/components/stats-band'
import { QuoteForm } from '@/components/quote-form'
import { ShareQuote } from '@/components/share-quote'
import { FaqList } from '@/components/faq-list'
import { GoogleReviews } from '@/components/google-reviews'
import { PartnersMarquee } from '@/components/partners-marquee'
import {
  IconArrow, IconCheckCircle, IconClock, IconMail, IconPhone, IconPin, IconWhatsApp,
  ProductIcon,
} from '@/components/icons'
import { CATEGORIES, SERVICES } from '@/lib/services'
import { CONTACT, PROCESS, SITE, WHY_US } from '@/lib/site'

export const metadata: Metadata = {
  title: `${SITE.advisor} — Auto, Home, Business & Commercial Insurance in Brampton`,
  description:
    'RIBO insurance broker with Diamond Insurance Group in Brampton, licensed in Ontario and Alberta. Auto, home, business, commercial, Super Visa and travel insurance, compared across Ontario’s leading insurers.',
  alternates: { canonical: SITE.url },
}

const VALUES = [
  {
    icon: 'shield',
    title: 'Independence first',
    body: 'We are not tied to one insurer. Every recommendation is the product of a market comparison, and we will tell you when your existing coverage is already the right one.',
  },
  {
    icon: 'compass',
    title: 'Plain language',
    body: 'Policy wording is written by lawyers for lawyers. Our job is to translate it, including the parts that are not in your favour, before you sign anything.',
  },
  {
    icon: 'handshake',
    title: 'Here at claim time',
    body: 'Arranging a policy is the easy part. We stay involved through the claim, because that is the only moment the coverage is actually tested.',
  },
]

const CHANNELS = [
  {
    icon: IconPhone,
    label: 'Call us',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    note: 'Fastest for anything urgent',
  },
  {
    icon: IconMail,
    label: 'Email',
    value: CONTACT.email,
    href: CONTACT.emailHref,
    note: 'We reply within one business day',
  },
  {
    icon: IconWhatsApp,
    label: 'WhatsApp',
    value: CONTACT.phone,
    href: CONTACT.whatsappHref,
    note: 'Message us any time',
  },
]

/** A short set of cross-cutting questions, distinct from the coverage details above. */
const HOME_FAQS = [
  {
    q: 'What does it cost to work with you?',
    a: 'Nothing. As a licensed insurance broker, compensation is paid by the insurer whose policy you choose, so advice, quotes and the application paperwork cost you nothing. The premium is the same whether you buy through us or direct.',
  },
  {
    q: 'How quickly can coverage start?',
    a: 'Auto, home and travel policies can often be issued the same day, sometimes within the hour. Business and commercial coverage that needs underwriting review can take a little longer.',
  },
  {
    q: 'Do you only work with people in Brampton?',
    a: 'No. The office is in Brampton, but coverage is arranged for clients across Ontario and Alberta. Most of the process is done by phone, email and secure e-signature.',
  },
  {
    q: 'What if I already have insurance elsewhere?',
    a: 'We are happy to review your existing policy, often at renewal, and show you how it compares. There is no obligation to switch, and no cost for the review.',
  },
]

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Hero />

      {/* ── Quote strip ─────────────────────────────────────────────────── */}
      <div className="wrap">
        <div className="quote-strip">
          <div>
            <h3>Not sure where to start?</h3>
            <p>
              Tell us what you need covered and we will come back with two or three real
              options, priced, with the trade-offs explained.
            </p>
          </div>
          <div className="quote-strip-actions">
            <a href="#quote" className="btn btn-primary">
              Get a free quote
              <IconArrow />
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-ghost">
              <IconPhone />
              Call now
            </a>
          </div>
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="section section-flush-top" id="services">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">What we arrange</span>
            <h2>Coverage for the risk you actually carry</h2>
            <p>
              Six lines of cover, each placed with the insurer that suits your situation,
              not the one that pays the most commission.
            </p>
          </Reveal>

          <div className="grid grid-3">
            {SERVICES.map((s, i) => {
              const category = CATEGORIES.find((c) => c.key === s.category)
              return (
                <Reveal key={s.slug} delay={i * 60} id={s.slug}>
                  <div className="card">
                    <span className="icon-badge">
                      <ProductIcon name={s.icon} />
                    </span>
                    {category && (
                      <span
                        style={{
                          display: 'block',
                          fontSize: '.72rem',
                          fontWeight: 700,
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                          color: 'var(--muted)',
                          marginBottom: 6,
                        }}
                      >
                        {category.title}
                      </span>
                    )}
                    <h3 style={{ fontSize: '1.15rem' }}>{s.name}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginTop: 8 }}>
                      {s.summary}
                    </p>
                    <ul className="checklist" style={{ marginTop: 18 }}>
                      {s.highlights.map((h) => (
                        <li key={h}>
                          <IconCheckCircle />
                          <span style={{ fontSize: '.87rem' }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Partners ────────────────────────────────────────────────────── */}
      <PartnersMarquee />

      {/* ── About / why us ──────────────────────────────────────────────── */}
      <section className="section section-alt" id="about">
        <div className="wrap split">
          <Reveal className="split-media from-left">
            <div className="brand-panel portrait">
              <Image
                src="/agrewal-portrait.jpg"
                alt={`${SITE.advisor}, insurance broker at ${SITE.legalName}`}
                width={1562}
                height={2048}
                sizes="(max-width: 900px) 60vw, 30vw"
              />
              <span className="panel-rule" />
              <p>&ldquo;{SITE.promise}&rdquo;</p>
            </div>
            <div className="badge-float">
              <strong>Local</strong>
              <span>Based in Brampton, serving clients across Ontario</span>
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow">Meet your broker</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.4vw,2.6rem)', marginTop: 14 }}>
              {SITE.advisor}
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              {SITE.advisor} is a RIBO insurance broker with {SITE.legalName}, licensed
              in Ontario and Alberta and based in Brampton, helping drivers, homeowners and business owners find
              coverage that actually fits their situation.
            </p>
            <p style={{ marginTop: 16, color: 'var(--ink-soft)' }}>
              The practice compares coverage across Ontario&rsquo;s leading insurers rather
              than offering just one company&rsquo;s product. That matters because the same
              risk can be assessed very differently by two insurers, and knowing which one
              to approach is often the difference between a straightforward approval and a
              declined application.
            </p>
            <ul className="checklist">
              {WHY_US.slice(0, 4).map((w) => (
                <li key={w.title}>
                  <IconCheckCircle />
                  <span>
                    <strong>{w.title}.</strong> {w.body}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#quote" className="btn btn-primary" style={{ marginTop: 28 }}>
              Book a conversation
              <IconArrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      {/* ── What we stand for ──────────────────────────────────────────── */}
      <section className="section section-flush-top">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">What we stand for</span>
            <h2>Three things we will not compromise on</h2>
          </Reveal>
          <div className="grid grid-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card">
                  <span className="icon-badge">
                    <ProductIcon name={v.icon} />
                  </span>
                  <h3 style={{ fontSize: '1.15rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.93rem', marginTop: 10 }}>
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">How it works</span>
            <h2>Four steps, and we do most of them</h2>
          </Reveal>
          <div className="steps">
            {PROCESS.map((s, i) => (
              <Reveal key={s.step} delay={i * 80} className="step lit">
                <span className="num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Remaining reasons ───────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">What you get</span>
            <h2>More than a quote</h2>
          </Reveal>
          <div className="grid grid-3">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="card">
                  <span className="icon-badge">
                    <ProductIcon name={w.icon} />
                  </span>
                  <h3 style={{ fontSize: '1.1rem' }}>{w.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginTop: 10 }}>
                    {w.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google reviews ──────────────────────────────────────────────── */}
      <GoogleReviews />

      {/* ── Contact & quote form ────────────────────────────────────────── */}
      <section className="section section-alt" id="contact">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">Get in touch</span>
            <h2>Free, no obligation</h2>
          </Reveal>

          <div className="grid grid-3" style={{ marginBottom: 48 }}>
            {CHANNELS.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.label} delay={i * 70}>
                  <a
                    href={c.href}
                    className="card"
                    style={{ display: 'block' }}
                    {...(c.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span className="icon-badge">
                      <Icon />
                    </span>
                    <h3 style={{ fontSize: '1.05rem' }}>{c.label}</h3>
                    <p
                      style={{
                        color: 'var(--red)',
                        fontWeight: 600,
                        marginTop: 8,
                        fontSize: '.98rem',
                      }}
                    >
                      {c.value}
                    </p>
                    <p style={{ color: 'var(--muted)', fontSize: '.87rem', marginTop: 4 }}>
                      {c.note}
                    </p>
                  </a>
                </Reveal>
              )
            })}
            <Reveal delay={140}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.addressLine)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ display: 'block' }}
              >
                <span className="icon-badge">
                  <IconPin />
                </span>
                <h3 style={{ fontSize: '1.05rem' }}>Head office</h3>
                <p style={{ color: 'var(--ink-soft)', marginTop: 8, fontSize: '.92rem' }}>
                  {CONTACT.street}
                  <br />
                  {CONTACT.city}, {CONTACT.regionLong}
                </p>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: '.87rem',
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <IconClock style={{ width: 15, height: 15, flex: 'none' }} />
                  {CONTACT.hours}
                </p>
                <span
                  className="link-arrow"
                  style={{ marginTop: 12, fontSize: '.87rem', fontWeight: 600 }}
                >
                  Get directions
                  <IconArrow />
                </span>
              </a>
            </Reveal>
          </div>

          <div className="split" id="quote">
            <Reveal>
              <span className="eyebrow">Free, no obligation</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.4vw,2.5rem)', marginTop: 14 }}>
                Tell us what you need covered
              </h2>
              <p className="lede" style={{ marginTop: 16 }}>
                Send the form and we will call you back, usually the same day. If it is
                urgent — a Super Visa deadline or a policy renewing this week — call
                directly and we will deal with it on the spot.
              </p>
              <ShareQuote />
            </Reveal>

            <Reveal delay={80}>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap-narrow">
          <Reveal className="sec-head center">
            <span className="eyebrow center">Common questions</span>
            <h2>Before you call</h2>
          </Reveal>
          <Reveal>
            <FaqList items={HOME_FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Let&rsquo;s get you covered properly</h2>
                <p>
                  A short conversation is usually enough to tell you whether your current
                  coverage is doing its job. There is no cost and no obligation.
                </p>
              </div>
              <div className="cta-band-actions">
                <a href="#quote" className="btn btn-primary">
                  Request a free quote
                  <IconArrow />
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-light">
                  <IconPhone />
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.whatsappHref}
                  className="btn btn-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWhatsApp />
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
