'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SHARE } from '@/lib/site'
import { IconCheck, IconDownload, IconLink, IconWhatsApp } from './icons'

/**
 * QR code for the quote form, plus ways to pass the form on: WhatsApp (any
 * contact), copy link and a downloadable QR for print.
 */
export function ShareQuote() {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(SHARE.quoteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the link is still visible to copy by hand */
    }
  }

  return (
    <div className="share-quote">
      <div className="share-quote-qr">
        <Image
          src={SHARE.qrPng}
          alt={`QR code that opens the quote form at ${SHARE.quoteUrl}`}
          width={2048}
          height={2048}
          sizes="132px"
        />
      </div>

      <div className="share-quote-body">
        <h3>Scan or share this form</h3>
        <p>
          Scan with your phone camera to fill it in on the go, or send it to family and
          friends who need cover.
        </p>
        <div className="share-quote-actions">
          <a
            href={SHARE.whatsappHref}
            className="btn btn-sm btn-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp />
            Share on WhatsApp
          </a>
          <button type="button" className="btn btn-sm btn-ghost" onClick={copyLink}>
            {copied ? <IconCheck /> : <IconLink />}
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          <a href={SHARE.qrPng} download="aginsurance-quote-qr.png" className="btn btn-sm btn-ghost">
            <IconDownload />
            Download QR
          </a>
        </div>
      </div>
    </div>
  )
}
