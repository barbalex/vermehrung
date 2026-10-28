import { isId } from './isId.ts'

export const herkunftIdInUrl = (url) => {
  if (url.includes('Herkuenfte')) {
    const indexOfId = url.indexOf('Herkuenfte') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
