import isUuid from 'is-uuid'

export const ausLieferungIdInUrl = (url) => {
  if (url.includes('Aus-Lieferungen')) {
    const indexOfId = url.indexOf('Aus-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
