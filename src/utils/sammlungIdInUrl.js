import { isId } from './isId.js'

export const sammlungIdInUrl = (url) => {
  if (url.includes('Sammlungen')) {
    const indexOfId = url.indexOf('Sammlungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
