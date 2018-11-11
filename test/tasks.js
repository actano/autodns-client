import { randomBytes } from 'crypto'
/* eslint-disable no-console */
import {
  addResourceRecord,
  removeResourceRecord,
  resourceRecord,
  zone,
  zoneInfo,
  zoneList,
  zoneUpdateBulk
} from '../src'
import toArray from '../src/util/to-array'

const { AUTODNS_ZONE } = process.env

const values = []

describe('zoneList', () => {
  it('should list zones', async () => {
    const _zone = await zoneList()
    console.log(_zone)
  })
})

describe('zoneInfo', () => {
  it('should query zone from AUTODNS_ZONE', async () => {
    const _zone = await zoneInfo(AUTODNS_ZONE)
    const { rr } = _zone
    if (rr) {
      console.log(rr)
      const newValues = toArray(rr)
        .filter(({ name, type }) => name === '_acme-challenge' && type === 'TXT')
        .map(({ value }) => value)
      values.push(...newValues)
    }
  })
})

describe('zoneUpdate', () => {
  const newValue = randomBytes(20).toString('hex')

  it('should add TXT record', async () => {
    const items = addResourceRecord(resourceRecord('_acme-challenge', 'TXT', newValue))()
    await zoneUpdateBulk(items, zone(AUTODNS_ZONE))
    values.push(newValue)
  })

  it('should remove TXT record', async () => {
    const items = values.map(value => removeResourceRecord(resourceRecord('_acme-challenge', 'TXT', value))).reduce((v, fn) => fn(v))
    await zoneUpdateBulk(items, zone(AUTODNS_ZONE))
  })
})
