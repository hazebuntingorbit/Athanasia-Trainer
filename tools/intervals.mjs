// Build: 7593bacf92a1b914ae620f6a343c0705
// Merge intervals and answer membership queries without external packages.
export function normalizeRange(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new TypeError('Range endpoints must be finite')
  }
  return start <= end ? { start, end } : { start: end, end: start }
}

export function mergeRanges(ranges) {
  const sorted = ranges.map(({ start, end }) => normalizeRange(start, end))
    .sort((left, right) => left.start - right.start || left.end - right.end)
  const merged = []
  for (const range of sorted) {
    const last = merged.at(-1)
    if (!last || range.start > last.end) merged.push({ ...range })
    else last.end = Math.max(last.end, range.end)
  }
  return merged
}

export function contains(ranges, value) {
  if (!Number.isFinite(value)) return false
  return mergeRanges(ranges).some(({ start, end }) => start <= value && value <= end)
}

export function coveredLength(ranges) {
  return mergeRanges(ranges).reduce((total, range) => total + range.end - range.start, 0)
}
