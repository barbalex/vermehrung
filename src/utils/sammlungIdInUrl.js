import isUuid from 'is-uuid'

export const sammlungIdInUrl = (url) => {
  if (url.includes('Sammlungen')) {
    const indexOfId = url.indexOf('Sammlungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
