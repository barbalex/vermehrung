import { isId } from './isId.ts'

export const ausLieferungIdInUrl = (url) => {
  if (url.includes('Aus-Lieferungen')) {
    const indexOfId = url.indexOf('Aus-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
