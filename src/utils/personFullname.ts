import type { PersonRow } from './rowTypes.ts'

export const personFullname = (p: PersonRow): string | undefined => {
  if (!p) return undefined
  if (p.vorname && p.name) {
    return `${p.vorname} ${p.name}`
  }
  if (p.name) return p.name
  if (p.vorname) return p.vorname
  return undefined
}
