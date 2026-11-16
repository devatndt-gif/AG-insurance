'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, servicesByCategory } from '@/lib/services'
import { SITE, CONTACT } from '@/lib/site'
import {
  IconArrow, IconChevron, IconDiamond, IconMail, IconMoon, IconPhone, IconSparkle, IconSun,
  IconWhatsApp, IconX,
} from './icons'

const THEME_KEY = 'theme'

export function SiteHeader() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openAcc, setOpenAcc] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /*
    The theme deliberately lives in the DOM, not in React state. The server
    cannot know what is in localStorage, so holding it in state made the server
    render one icon and the client another, which is a hydration mismatch. The
    inline script in the layout sets data-theme before first paint; this reads
    that attribute back on click, and CSS decides which icon is visible.
  */
  function toggleTheme() {
    const root = document.documentElement
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* storage blocked — the theme still applies for this page view */
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setDrawerOpen(false)
      setMegaOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160)
  }
  function closeAll() {
    setDrawerOpen(false)
    setMegaOpen(false)
  }

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-left">
            <a href={CONTACT.phoneHref}>
              <IconPhone />
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.whatsappHref}
              className="topbar-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp />
              WhatsApp Us
            </a>
            <a href={CONTACT.emailHref} className="hide-sm">
              <IconMail />
              {CONTACT.email}
            </a>
          </div>
          <div className="topbar-right">
            <span className="hide-sm">{SITE.tagline}</span>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap navrow">
          <Link href="/" className="brand" aria-label={`${SITE.legalName} home`} onClick={closeAll}>
            <span className="brand-leaf">
              <IconDiamond className="brand-gem" aria-hidden="true" />
              <IconSparkle className="brand-glint" aria-hidden="true" />
            </span>
            <span className="brand-word">
              <span className="name">{SITE.name}</span>
              <span className="sub">{SITE.legalName}</span>
            </span>
          </Link>

          <nav aria-label="Main">
            <ul className="mainnav">
              <li>
                <a href="#about">About</a>
              </li>
              <li
                className={megaOpen ? 'open' : undefined}
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  Services
                  <IconChevron className="chev" />
                </button>

                <div className="mega" role="menu">
                  <div className="mega-grid">
                    {CATEGORIES.map((cat) => (
                      <div className="mega-col" key={cat.key}>
                        <h5>{cat.title}</h5>
                        {servicesByCategory(cat.key).map((s) => (
                          <a key={s.slug} href={`#${s.slug}`} role="menuitem" onClick={closeAll}>
                            {s.shortName}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mega-foot">
                    <p>Not sure which coverage fits? A short call usually settles it.</p>
                    <a href="#quote" className="btn btn-primary btn-sm" onClick={closeAll}>
                      Get a free quote
                      <IconArrow />
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a href="#reviews">Reviews</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Both icons render; CSS shows the one that matches data-theme.
                The label stays constant so it cannot mismatch either. */}
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Switch between light and dark theme"
            >
              <IconMoon className="icon-light" aria-hidden="true" />
              <IconSun className="icon-dark" aria-hidden="true" />
            </button>
            <a
              href={CONTACT.whatsappHref}
              className="nav-wa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
            >
              <IconWhatsApp />
            </a>
            <a href="#quote" className="btn btn-primary btn-flash">
              Free Quote
              <IconArrow />
            </a>
            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile drawer ---- */}
      <div
        className={`drawer-mask${drawerOpen ? ' on' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`drawer${drawerOpen ? ' on' : ''}`} aria-label="Mobile navigation">
        <div className="drawer-head">
          <span className="brand">
            <span className="brand-leaf">
              <IconDiamond className="brand-gem" aria-hidden="true" />
            </span>
            <span className="brand-word">
              <span className="name">{SITE.name}</span>
              <span className="sub">{SITE.legalName}</span>
            </span>
          </span>
          <button
            type="button"
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <IconX />
          </button>
        </div>

        <div className="drawer-body">
          <a href="#about" onClick={closeAll}>About</a>

          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className={`drawer-acc${openAcc === cat.key ? ' open' : ''}`}
            >
              <button
                type="button"
                aria-expanded={openAcc === cat.key}
                onClick={() => setOpenAcc(openAcc === cat.key ? null : cat.key)}
              >
                {cat.title}
                <IconChevron />
              </button>
              <div className="drawer-acc-body">
                {servicesByCategory(cat.key).map((s) => (
                  <a key={s.slug} href={`#${s.slug}`} onClick={closeAll}>
                    {s.shortName}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <a href="#reviews" onClick={closeAll}>Reviews</a>
          <a href="#contact" onClick={closeAll}>Contact</a>
        </div>

        <div className="drawer-foot">
          <a href={CONTACT.phoneHref} className="btn btn-ghost btn-block">
            <IconPhone />
            {CONTACT.phone}
          </a>
          <a
            href={CONTACT.whatsappHref}
            className="btn btn-block btn-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp />
            WhatsApp Us
          </a>
          <a href="#quote" className="btn btn-primary btn-block btn-flash" onClick={closeAll}>
            Get a Free Quote
            <IconArrow />
          </a>
        </div>
      </aside>
    </>
  )
}
