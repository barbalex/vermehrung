import { isId } from './isId.js'

export const sammelLieferungIdInUrl = (url) => {
  if (url.includes('Sammel-Lieferungen')) {
    const indexOfId = url.indexOf('Sammel-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
