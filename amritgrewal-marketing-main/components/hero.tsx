'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CONTACT, SITE } from '@/lib/site'
import { IconArrow, IconCheckCircle, IconPhone } from './icons'

const SLIDES = [
  { src: '/slider/auto-insurance.jpg', alt: 'A driver on the road, protected by auto insurance' },
  { src: '/slider/home-insurance.jpg', alt: 'A protected residential neighbourhood' },
  { src: '/slider/business-insurance.jpg', alt: 'A small business team at work' },
]

const TRUST = [
  'RIBO Insurance Broker, licensed in ON and AB',
  'Compare coverage across Ontario’s leading insurers',
  'Free, no-obligation quotes',
]

export function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-media" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={s.src} className={`hero-slide${i === idx ? ' on' : ''}`}>
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={82}
            />
          </div>
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="dot" />
            RIBO Insurance Broker · Licensed in ON and AB · Diamond Insurance Group · Brampton, Ontario
          </span>

          <h1>
            Protecting what matters most, with coverage that&nbsp;fits{' '}
            <em>your life</em>
          </h1>

          <p className="hero-sub">
            Auto, home, business, commercial, Super Visa and travel insurance.
            We compare coverage across Ontario&rsquo;s leading insurers and explain
            the difference in plain language.
          </p>

          <div className="hero-cta">
            <a href="#quote" className="btn btn-primary">
              Get a free quote
              <IconArrow />
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-light">
              <IconPhone />
              {CONTACT.phone}
            </a>
          </div>

          <ul className="hero-trust">
            {TRUST.map((t) => (
              <li key={t}>
                <IconCheckCircle />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-figure">
          <Image
            src="/agrewal-portrait-cutout.png"
            alt={`${SITE.advisor}, insurance broker at ${SITE.legalName}`}
            width={1562}
            height={2048}
            sizes="(max-width: 900px) 62vw, 380px"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="hero-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={i === idx ? 'on' : undefined}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </section>
  )
}
