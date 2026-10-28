import { isId } from './isId.ts'

export const sammelLieferungIdInUrl = (url: string[]) => {
  if (url.includes('Sammel-Lieferungen')) {
    const indexOfId = url.indexOf('Sammel-Lieferungen') + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}
