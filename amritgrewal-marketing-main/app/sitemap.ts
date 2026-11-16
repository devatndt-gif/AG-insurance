import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  return routes.map((entry) => ({ ...entry, lastModified: now }))
}
