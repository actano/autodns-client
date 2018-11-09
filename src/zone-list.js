import task from './util/task'

const CODE = '0205'

export default async () => (await task(CODE, { view: { offset: 0, limit: 100, children: 1 } })).zone
