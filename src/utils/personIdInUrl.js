import isUuid from 'is-uuid'

export const personIdInUrl = (url) => {
  if (url.includes('Personen')) {
    const indexOfId = url.indexOf('Personen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
