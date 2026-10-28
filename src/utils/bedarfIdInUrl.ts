import { isId } from './isId.ts'

export const bedarfIdInUrl = (url: string[]) => {
  if (url.includes('Bedarf')) {
    const indexOfId = url.indexOf('Bedarf') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
