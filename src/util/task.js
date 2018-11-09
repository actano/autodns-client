import client from './client'

export default (code, data) => client({ code, ...data })
