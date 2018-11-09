import task from './util/task'

const CODE = '0205'

export default async name => (await task(CODE, { zone: { name } })).zone
