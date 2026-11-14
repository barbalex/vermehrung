import { isId } from './isId.ts'

// every <entity>IdInUrl helper differs only in the folder literal -
// one implementation, aliased per folder below
export const idInUrl = (url: string[], folder: string) => {
  if (url.includes(folder)) {
    const indexOfId = url.indexOf(folder) + 1
    if (url.length > indexOfId) {
      const id = url?.[indexOfId]
      if (isId(id)) return id
    }
  }
  return undefined
}

export const anLieferungIdInUrl = (url: string[]) =>
  idInUrl(url, 'An-Lieferungen')
export const artIdInUrl = (url: string[]) => idInUrl(url, 'Arten')
export const ausLieferungIdInUrl = (url: string[]) =>
  idInUrl(url, 'Aus-Lieferungen')
export const bedarfIdInUrl = (url: string[]) => idInUrl(url, 'Bedarf')
export const gartenIdInUrl = (url: string[]) => idInUrl(url, 'Gaerten')
export const herkunftIdInUrl = (url: string[]) => idInUrl(url, 'Herkuenfte')
export const kulturIdInUrl = (url: string[]) => idInUrl(url, 'Kulturen')
export const lieferungIdInUrl = (url: string[]) => idInUrl(url, 'Lieferungen')
export const personIdInUrl = (url: string[]) => idInUrl(url, 'Personen')
export const sammelLieferungIdInUrl = (url: string[]) =>
  idInUrl(url, 'Sammel-Lieferungen')
export const sammlungIdInUrl = (url: string[]) => idInUrl(url, 'Sammlungen')
export const teilkulturIdInUrl = (url: string[]) => idInUrl(url, 'Teilkulturen')
export const zaehlungIdInUrl = (url: string[]) => idInUrl(url, 'Zaehlungen')
