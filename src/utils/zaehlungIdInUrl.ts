import { isId } from './isId.ts'

export const zaehlungIdInUrl = (url) => {
  if (url.includes('Zaehlungen')) {
    const indexOfId = url.indexOf('Zaehlungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
