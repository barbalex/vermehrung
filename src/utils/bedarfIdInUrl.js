import isUuid from 'is-uuid'

export const bedarfIdInUrl = (url) => {
  if (url.includes('Bedarf')) {
    const indexOfId = url.indexOf('Bedarf') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
