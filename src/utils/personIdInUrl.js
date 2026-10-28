import { isId } from './isId.js'

export const personIdInUrl = (url) => {
  if (url.includes('Personen')) {
    const indexOfId = url.indexOf('Personen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
