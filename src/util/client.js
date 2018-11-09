import request from 'superagent'
import { js2xml, xml2js } from 'xml-js'
import inlineText from './inline-text'

const { AUTODNS_USER, AUTODNS_PASSWORD, AUTODNS_CONTEXT } = process.env
const _auth = (user, password, context) => ({ user, password, context })
const auth = _auth(AUTODNS_USER, AUTODNS_PASSWORD, AUTODNS_CONTEXT)

const _declaration = {
  _attributes: {
    version: '1.0',
    encoding: 'utf-8',
  },
}

const options = { compact: true }


const toArray = (value) => {
  if (Array.isArray(value)) return value
  if (value === null || typeof value === 'undefined') return []
  return [value]
}

const singleResult = ({ status, msg, data }) => {
  toArray(msg).forEach(({ type, code, text }) => {
    const fn = type === 'error' ? 'error' : 'log'
    console[fn](`${code}: ${text} [${type}]`) // eslint-disable-line no-console
  })
  const { type, code, text } = status
  if (type === 'error') {
    throw new Error(`${code}: ${text}`)
  }
  return data
}

const _result = result => (Array.isArray(result) ? result.map(singleResult) : singleResult(result))

export default async (task) => {
  if (!AUTODNS_USER || !AUTODNS_PASSWORD || !AUTODNS_CONTEXT) {
    throw new Error('You must set AUTODNS_USER, AUTODNS_PASSWORD, AUTODNS_CONTEXT in process.env')
  }
  const xml = js2xml({
    _declaration,
    request: {
      auth,
      task,
    },
  }, options)
  const httpResponse = await request.post('https://gateway.autodns.com/').type('xml').send(xml)
  if (!httpResponse.ok) throw new Error(`Status: ${httpResponse.status}`)
  const { response } = xml2js(httpResponse.text, options)
  const { result } = inlineText(response)
  return _result(result)
}
