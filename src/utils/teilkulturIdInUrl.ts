import { isId } from './isId.ts'

export const teilkulturIdInUrl = (url) => {
  if (url.includes('Teilkulturen')) {
    const indexOfId = url.indexOf('Teilkulturen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
