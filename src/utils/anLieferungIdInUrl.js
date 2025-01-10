import isUuid from 'is-uuid'

export const anLieferungIdInUrl = (url) => {
  if (url.includes('An-Lieferungen')) {
    const indexOfId = url.indexOf('An-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
