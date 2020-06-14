import isUuid from 'is-uuid'

export default (url) => {
  if (url.includes('Lieferungen')) {
    const indexOfId = url.indexOf('Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
