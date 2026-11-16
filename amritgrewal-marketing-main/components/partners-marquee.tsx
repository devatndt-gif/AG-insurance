import Image from 'next/image'
import { Reveal } from './reveal'

/** Insurers placed through Diamond Insurance Group, as listed on its partners slider. */
const PARTNERS = [
  { name: 'Intact Insurance', file: 'intact.jpg', w: 457, h: 215 },
  { name: 'Aviva', file: 'aviva.png', w: 1024, h: 187 },
  { name: 'Definity', file: 'definity.png', w: 898, h: 246 },
  { name: 'Wawanesa', file: 'wawanesa.png', w: 1024, h: 362 },
  { name: 'Desjardins', file: 'desjardins.png', w: 1024, h: 219 },
  { name: 'Pembridge Insurance', file: 'pembridge.jpg', w: 1024, h: 219 },
  { name: 'Chubb', file: 'chubb.jpg', w: 1024, h: 153 },
  { name: 'Optimum General Insurance', file: 'optimum.png', w: 900, h: 225 },
  { name: 'Echelon Insurance', file: 'echelon.png', w: 1000, h: 464 },
  { name: 'Pafco', file: 'pafco.jpg', w: 1023, h: 214 },
  { name: 'Facility Association', file: 'facility-association.png', w: 1024, h: 193 },
  { name: 'Signature Insurance', file: 'signature.jpg', w: 1024, h: 209 },
  { name: 'Max Insurance', file: 'max.png', w: 1024, h: 553 },
  { name: 'Vailo', file: 'vailo.png', w: 450, h: 111 },
  { name: 'Special Risk Insurance Managers', file: 'special-risk.jpg', w: 436, h: 132 },
  { name: 'Excess Underwriting', file: 'excess.jpg', w: 446, h: 159 },
  { name: 'Agile Underwriting Solutions', file: 'agile.png', w: 245, h: 140 },
  { name: 'Nextwave Insurance Canada', file: 'nextwave.png', w: 224, h: 67 },
  { name: 'Modern Specialty Insurance', file: 'msi.png', w: 600, h: 571 },
  { name: 'Burns & Wilcox', file: 'burns-wilcox.png', w: 140, h: 56 },
  { name: 'April', file: 'april.jpg', w: 200, h: 62 },
  { name: 'Canada Life', file: 'canada-life.svg', w: 626, h: 216 },
  { name: 'Equitable', file: 'equitable.png', w: 481, h: 397 },
  { name: 'Empire Life', file: 'empire-life.png', w: 410, h: 162 },
  { name: 'BMO Insurance', file: 'bmo.png', w: 381, h: 72 },
]

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {PARTNERS.map((p) => (
        <li key={p.file} className="marquee-logo">
          <Image
            src={`/partners/${p.file}`}
            alt={hidden ? '' : p.name}
            width={p.w}
            height={p.h}
            sizes="180px"
            unoptimized={p.file.endsWith('.svg')}
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * Infinite logo strip. The list is rendered twice and the track slides by
 * exactly one copy, so the loop is seamless; the copy is hidden from
 * assistive tech so each insurer is announced once.
 */
export function PartnersMarquee() {
  return (
    <section className="section-tight" id="partners" aria-labelledby="partners-title">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow center">Our partners</span>
          <h2 id="partners-title">Compared across Canada&rsquo;s leading insurers</h2>
        </Reveal>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  )
}
