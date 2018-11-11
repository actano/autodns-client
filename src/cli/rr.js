export const RR = /^(\S+)\s+(\d+\s+)?([A-Z]+)\s+(\d+\s+)?(?:(\S+)|"([^"]*)"|'([^']*)')$/

export default (s) => {
  const matcher = RR.exec(s)
  if (!matcher) return false
  const name = matcher[1]
  const ttl = matcher[2]
  const type = matcher[3]
  const pref = matcher[4]
  const value = matcher[5] || matcher[6] || matcher[7]
  const result = { name, type, value }
  if (typeof ttl !== 'undefined') {
    result.ttl = Number(ttl)
  }
  if (typeof pref !== 'undefined') {
    result.pref = Number(pref)
  }
  return result
}
