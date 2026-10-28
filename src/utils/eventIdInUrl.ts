import { isId } from './isId.ts'

export const eventIdInUrl = (url: string[]) => {
  if (url.includes('Events')) {
    const indexOfId = url.indexOf('Events') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
