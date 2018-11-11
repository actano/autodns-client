export default (value) => {
  if (Array.isArray(value)) return value
  if (value === null || typeof value === 'undefined') return []
  return [value]
}
