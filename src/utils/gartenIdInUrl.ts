import { isId } from './isId.ts'

export const gartenIdInUrl = (url: string[]) => {
  if (url.includes('Gaerten')) {
    const indexOfId = url.indexOf('Gaerten') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
