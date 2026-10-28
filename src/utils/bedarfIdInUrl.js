import { isId } from './isId.js'

export const bedarfIdInUrl = (url) => {
  if (url.includes('Bedarf')) {
    const indexOfId = url.indexOf('Bedarf') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
