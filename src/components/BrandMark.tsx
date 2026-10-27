// Two nights on a clock axis: time in bed (amber) with sleep inside it, then a
// full night of sleep. The site's chart device, reduced to a logo.
export function BrandMark() {
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">
      <rect x="0" y="2" width="26" height="5" rx="1" fill="var(--awake)" />
      <rect x="8" y="2" width="14" height="5" fill="var(--asleep)" />
      <rect x="0" y="11" width="26" height="5" rx="1" fill="var(--asleep)" />
    </svg>
  );
}
