import { isId } from './isId.js'

export const kulturIdInUrl = (url) => {
  if (url.includes('Kulturen')) {
    const indexOfId = url.indexOf('Kulturen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
