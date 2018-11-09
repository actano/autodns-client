/* eslint-disable no-console */
import { zoneInfo, zoneList } from '../src'

const { AUTODNS_ZONE } = process.env

describe('zoneList', () => {
  it('should list zones', async () => {
    const zone = await zoneList()
    console.log(zone)
  })
})

describe('zoneInfo', () => {
  it('should query zone from AUTODNS_ZONE', async () => {
    const zone = await zoneInfo(AUTODNS_ZONE)
    console.log(zone.rr)
  })
})
