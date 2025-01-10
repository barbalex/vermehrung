import isUuid from 'is-uuid'

export const herkunftIdInUrl = (url) => {
  if (url.includes('Herkuenfte')) {
    const indexOfId = url.indexOf('Herkuenfte') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
