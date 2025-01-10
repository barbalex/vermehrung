import isUuid from 'is-uuid'

export const kulturIdOfAusLieferungInUrl = (url) => {
  if (url.includes('Aus-Lieferungen') && url.includes('Kulturen')) {
    const indexOfId = url.indexOf('Kulturen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
