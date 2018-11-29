import { expect } from 'chai'

import rr from '../src/cli/rr'

describe('resource record regular expression', () => {
  const name = 'www'
  const type = 'A'
  const value = '127.0.0.1'
  const ttl = 600
  const pref = 10

  it('should parse "name type value"', () => {
    const result = rr(`${name} ${type} ${value}`)
    expect(result).to.deep.equal({ name, type, value })
  })

  it('should parse "name ttl type value"', () => {
    const result = rr(`${name} ${ttl} ${type} ${value}`)
    expect(result).to.deep.equal({
      name, ttl, type, value,
    })
  })

  it('should parse "name ttl type pref value"', () => {
    const result = rr(`${name} ${ttl} ${type} ${pref} ${value}`)
    expect(result).to.deep.equal({
      name, ttl, type, pref, value,
    })
  })
})
