import { TRUST } from '@/lib/site'
import { ProductIcon } from './icons'

/**
 * A row of qualitative trust markers. Deliberately not a number counter — no
 * insurer count, years-in-business figure or review count is confirmed for
 * this client, so the row states plain facts instead of manufacturing stats.
 */
export function StatsBand() {
  return (
    <div className="stats">
      {TRUST.map((t) => (
        <div className="stat" key={t.label}>
          <span className="icon-badge">
            <ProductIcon name={t.icon} />
          </span>
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}
