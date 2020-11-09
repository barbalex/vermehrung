import isUuid from 'is-uuid'

const teilkulturIdInUrl = (url) => {
  if (url.includes('Teilkulturen')) {
    const indexOfId = url.indexOf('Teilkulturen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}

export default teilkulturIdInUrl
