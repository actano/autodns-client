import { isObject } from 'util'

const hasProp = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

const inlineText = (obj) => {
  if (Array.isArray(obj)) {
    for (const o of obj) {
      inlineText(o)
    }
    return obj
  }
  if (isObject(obj)) {
    for (const key of Object.keys(obj)) {
      const value = obj[key]
      if (Array.isArray(value)) {
        inlineText(value)
      }
      if (value && hasProp(value, '_text') && Object.keys(value).length === 1) {
        obj[key] = value._text // eslint-disable-line no-param-reassign
      } else {
        inlineText(value)
      }
    }
  }
  return obj
}

export default inlineText
