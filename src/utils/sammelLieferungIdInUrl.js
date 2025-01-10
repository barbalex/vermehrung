import isUuid from 'is-uuid'

export const sammelLieferungIdInUrl = (url) => {
  if (url.includes('Sammel-Lieferungen')) {
    const indexOfId = url.indexOf('Sammel-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
