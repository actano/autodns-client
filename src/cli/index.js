import program from 'commander'
import { zone as _zone } from '../zone'
import { addResourceRecord, removeResourceRecord, zoneUpdateBulk } from '../zone-update'
import rr from './rr'

const main = () => {
  const parseRR = (val) => {
    const item = rr(val)
    if (!item) {
      console.error(`Cannot parse resource record: ${val}`)
      program.help()
    }
    return item
  }

  const collect = (val, memo = []) => memo.push(val) && memo

  const collectResourceRecords = (val, memo = []) => collect(parseRR(val), memo)

  let fn = null

  program
    .command('zone-update')
    .option('-z, --zone <zone>', 'Zone', collect, [])
    .option('-a, --add <rr>', 'Resource Record', collectResourceRecords, [])
    .option('-r, --remove <rr>', 'Resource Record', collectResourceRecords, [])
    .action((options) => {
      const { zone, add, remove } = options
      if (!zone.length) {
        console.error('At least one zone must be given')
        program.help()
      }
      const items = add.map(addResourceRecord).concat(remove.map(removeResourceRecord))
      if (!items.length) {
        console.error('At least on one --add or --remove must be given')
        program.help()
      }
      const cmd = items.reduce((prev, current) => current(prev), {})
      fn = zoneUpdateBulk(cmd, ...zone.map(_zone))
    })
  program.parse(process.argv)
  if (!fn) {
    program.help()
  }
  Promise.resolve(fn).catch(err => console.error(err))
}

main()
