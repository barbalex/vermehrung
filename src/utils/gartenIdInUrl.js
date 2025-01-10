import isUuid from 'is-uuid'

export const gartenIdInUrl = (url) => {
  if (url.includes('Gaerten')) {
    const indexOfId = url.indexOf('Gaerten') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
