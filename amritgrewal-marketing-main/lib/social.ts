/**
 * Google reviews.
 *
 * Reads live data when credentials are present and returns empty results
 * otherwise, so the site works before the account is connected. Nothing here
 * ever invents a review — the component falls back to a plain link to the
 * real listing rather than showing placeholder social proof.
 *
 * Required environment variables (see README):
 *   GOOGLE_PLACES_API_KEY    Google Cloud key with the Places API (New) enabled
 *   GOOGLE_PLACE_ID          the Place ID of the Google Business Profile
 */

import { CONTACT, SITE } from './site'

/** Refresh window for the feed, in seconds. */
const ONE_HOUR = 3600

export type GoogleReview = {
  id: string
  author: string
  authorUrl?: string
  avatar?: string
  rating: number
  text: string
  relativeTime: string
}

export type GoogleReviewSummary = {
  rating: number | null
  total: number | null
  reviews: GoogleReview[]
  /** Link to the listing, always present so the section is useful unconfigured. */
  readUrl: string
  writeUrl: string
}

type PlacesReview = {
  name?: string
  rating?: number
  relativePublishTimeDescription?: string
  text?: { text?: string }
  originalText?: { text?: string }
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

/** Falls back to a Maps search when no Place ID is configured. */
function listingUrls(placeId?: string) {
  if (placeId) {
    return {
      readUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
      writeUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
    }
  }
  const query = encodeURIComponent(`${SITE.legalName} ${CONTACT.addressLine}`)
  const search = `https://www.google.com/maps/search/?api=1&query=${query}`
  return { readUrl: search, writeUrl: search }
}

/**
 * Rating summary and the reviews Google exposes. The Places API returns at most
 * five, which is a platform limit rather than something we choose.
 */
export async function getGoogleReviews(): Promise<GoogleReviewSummary> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  const urls = listingUrls(placeId)
  const empty: GoogleReviewSummary = { rating: null, total: null, reviews: [], ...urls }

  if (!key || !placeId) return empty

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
      next: { revalidate: ONE_HOUR, tags: ['google-reviews'] },
    })

    if (!res.ok) {
      console.error(`[google-reviews] ${res.status} ${res.statusText}`)
      return empty
    }

    const json = (await res.json()) as {
      rating?: number
      userRatingCount?: number
      reviews?: PlacesReview[]
      googleMapsUri?: string
    }

    const reviews = (json.reviews ?? [])
      .map((r, i): GoogleReview | null => {
        const text = (r.text?.text ?? r.originalText?.text ?? '').trim()
        const author = r.authorAttribution?.displayName?.trim()
        if (!text || !author) return null
        return {
          id: r.name ?? `review-${i}`,
          author,
          authorUrl: r.authorAttribution?.uri,
          avatar: r.authorAttribution?.photoUri,
          rating: r.rating ?? 5,
          text,
          relativeTime: r.relativePublishTimeDescription ?? '',
        }
      })
      .filter((r): r is GoogleReview => r !== null)

    return {
      rating: json.rating ?? null,
      total: json.userRatingCount ?? null,
      reviews,
      // Prefer the canonical Maps URI Google returns for reading.
      readUrl: json.googleMapsUri ?? urls.readUrl,
      writeUrl: urls.writeUrl,
    }
  } catch (err) {
    console.error('[google-reviews] fetch failed', err)
    return empty
  }
}
