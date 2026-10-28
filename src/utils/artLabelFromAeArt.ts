export const artLabelFromAeArt = ({ ae_art }) => {
  if (!ae_art) return '(kein Name)'

  if (!ae_art?.name) return '(kein Name)'

  return ae_art.name
}
