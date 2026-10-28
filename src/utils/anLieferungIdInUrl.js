import { isId } from './isId.js'

export const anLieferungIdInUrl = (url) => {
  if (url.includes('An-Lieferungen')) {
    const indexOfId = url.indexOf('An-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
