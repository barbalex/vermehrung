import type { AeArtRow } from './rowTypes.ts'

export const artLabelFromAeArt = ({ ae_art }: { ae_art: AeArtRow }) => {
  if (!ae_art) return '(kein Name)'

  if (!ae_art?.name) return '(kein Name)'

  return ae_art.name
}
