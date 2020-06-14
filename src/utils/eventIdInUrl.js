import isUuid from 'is-uuid'

export default (url) => {
  if (url.includes('Events')) {
    const indexOfId = url.indexOf('Events') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isUuid.v1(id)) return id
    }
  }
  return undefined
}
