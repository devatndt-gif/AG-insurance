import Link from 'next/link'
import { IconArrow, IconPhone, ProductIcon } from '@/components/icons'
import { SERVICES } from '@/lib/services'
import { CONTACT } from '@/lib/site'

export default function NotFound() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">404</span>
          <h1>We couldn&rsquo;t find that page</h1>
          <p>
            The link may be out of date, or the page may have moved. Here is what people
            usually come here for.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">
              Back to home
              <IconArrow />
            </Link>
            <a href={CONTACT.phoneHref} className="btn btn-light">
              <IconPhone />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/#${s.slug}`} className="scard">
                <span className="icon-badge">
                  <ProductIcon name={s.icon} />
                </span>
                <span>
                  <h3>{s.shortName}</h3>
                  <p>{s.summary}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
