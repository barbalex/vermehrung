import isUuid from 'is-uuid'

export const kulturIdOfAnLieferungInUrl = (url) => {
  if (url.includes('An-Lieferungen') && url.includes('Kulturen')) {
    const indexOfId = url.indexOf('Kulturen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
