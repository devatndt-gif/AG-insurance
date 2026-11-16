# Amritpal Grewal — Diamond Insurance Group

Marketing site for Amritpal Grewal, an insurance agent with Diamond Insurance Group in
Brampton, Ontario. Single-page site. Next.js 16 (App Router, Turbopack), React 19,
TypeScript, plain CSS with a token-driven theme.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Everything except the database
is optional — an unconfigured integration degrades to a sensible fallback rather
than breaking the page.

### CRM (lead capture)

```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
CRM_SUBDOMAIN="amritgrewal"
```

The quote form posts to `POST /api/enquiry`, which writes an `INTERESTED` row into
the CRM's `Client` table for the resolved tenant, links it to a `Product` row when
the visitor picked one off the menu, then fires two emails. **A `Tenant` row with
`subdomain = CRM_SUBDOMAIN` and `active = true` must exist**, or the route returns
503 and the form tells the visitor to phone instead.

Outgoing mail uses the SMTP settings stored on that tenant row (`smtpHost`,
`smtpUser`, `smtpPass`, `fromEmail`, and so on). If they are unset, lead capture
still works and only the emails are skipped. Set `notifyOnEnquiry` and
`notifyEmail` on the tenant to receive the advisor notification.

### Google reviews

```bash
GOOGLE_PLACES_API_KEY=""
GOOGLE_PLACE_ID=""
```

1. In [Google Cloud Console](https://console.cloud.google.com/) create a project
   and enable **Places API (New)**. Billing has to be enabled, though this usage
   sits well inside the free tier.
2. Create an API key and restrict it to the Places API.
3. Find the Place ID for the Google Business Profile using the
   [Place ID finder](https://developers.google.com/maps/documentation/places/web-service/place-id).

Google returns **at most five reviews** and gives no control over which ones. That
is a platform limit, not a setting in this codebase. Until both values are set the
section still renders the rating card, with working "Read all reviews" and "Leave
a review" buttons pointing at a Maps search for the business.

The section never displays invented content. With no credentials it shows only real
links, never placeholder testimonials.

Reviews are fetched server-side and cached for one hour. No key reaches the browser.

## Where the content lives

Almost everything on the site is data-driven. To change copy you usually edit one
of two files rather than a page:

| File | Drives |
| --- | --- |
| `lib/services.ts` | All 6 services: nav, the homepage "Our services" section, the quote form, sitemap |
| `lib/site.ts` | Brand, contact details, trust markers, "why us", process steps |

Adding a service to `SERVICES` gives it a nav entry and a card with no other
changes, as long as the icon name is registered in `components/icons.tsx`.

## Routes

```
/                          Homepage — a single page covering services, about, reviews and contact
/privacy-policy  /terms    Legal
/sitemap.xml  /robots.txt  Generated
/api/enquiry               POST — insurance lead capture
```

## Theming

Light and dark are driven entirely by CSS custom properties in `app/globals.css`.
An inline script in `app/layout.tsx` applies the saved or system theme before
first paint, so there is no flash. Two tokens are easy to confuse:

- `--navy` is an **accent** colour and deliberately flips to a lighter teal in dark
  mode.
- `--band` is the **ground** for the dark bands (topbar, page hero, CTA, footer).
  Use this one for large dark surfaces.

The `--red` / `--navy` / `--gold` variable names are historical (kept from an
earlier client's palette to limit the blast radius of the rebrand) but now hold
teal, dark-teal and orange values respectively — the primary and accent colours
sampled from the current logo.

## Assets

- `agrewal-logo.jpg` is the client's real logo lockup — icon mark, "INSURANCE"
  wordmark and the orange "Your Risks, Our Concern" tagline baked in as pixels. It
  is shown whole wherever a logo slot exists (header, footer, hero); it is not
  cropped or edited.
- `agrewal-portrait.jpg` is the advisor's headshot, used in the hero and the About
  section.
- `public/brand/` holds the wordmarks for the "Powered by" credit bar at the foot
  of the site — unrelated to the client's own brand.

## Things to confirm before launch

- **CRM tenant.** `CRM_SUBDOMAIN` defaults to `amritgrewal` — confirm this matches
  the subdomain provisioned in the sibling CRM.
- **Hours.** `CONTACT.hours` in `lib/site.ts` carries a placeholder schedule;
  confirm the real hours before launch.
