import { isId } from './isId.ts'

export const artIdInUrl = (url) => {
  if (url.includes('Arten')) {
    const indexOfId = url.indexOf('Arten') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
