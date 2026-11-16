import { CONTACT } from '@/lib/site'
import { IconWhatsApp } from './icons'

/**
 * Floating WhatsApp shortcut, fixed to the bottom-right of every page. The
 * pulsing rings, the periodic shake and the "Chat with us" bubble are all CSS
 * (see globals.css), so they stay crisp and stop under reduced motion.
 */
export function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsappHref}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-fab-label" aria-hidden="true">
        Chat with us
      </span>
      <span className="whatsapp-fab-icon">
        <span className="whatsapp-fab-ring" aria-hidden="true" />
        <span className="whatsapp-fab-ring" aria-hidden="true" />
        <IconWhatsApp />
        <span className="whatsapp-fab-dot" aria-hidden="true">1</span>
      </span>
    </a>
  )
}
