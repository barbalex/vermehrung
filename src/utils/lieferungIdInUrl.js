import isUuid from 'is-uuid'

export const lieferungIdInUrl = (url) => {
  if (url.includes('Lieferungen')) {
    const indexOfId = url.indexOf('Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  // return id also for an- and aus-lieferungen
  if (url.includes('An-Lieferungen')) {
    const indexOfId = url.indexOf('An-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  if (url.includes('Aus-Lieferungen')) {
    const indexOfId = url.indexOf('Aus-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
