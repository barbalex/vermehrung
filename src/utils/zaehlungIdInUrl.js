import isUuid from 'is-uuid'

export const zaehlungIdInUrl = (url) => {
  if (url.includes('Zaehlungen')) {
    const indexOfId = url.indexOf('Zaehlungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
