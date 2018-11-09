/* eslint-disable camelcase */
import task from './util/task'

const add = (array, value) => (array ? [...array, value] : [value])

export const addResourceRecord = rr => (zone = {}) => ({ ...zone, rr_add: add(zone.rr_add, rr) })
export const removeResourceRecord = rr => (zone = {}) => ({ ...zone, rr_rem: add(zone.rr_rem, rr) })

export const zoneUpdate = zone => task('0202', { zone })
export const zoneUpdateBulk = (items, ...zone) => task('0202001', { default: items, zone })
