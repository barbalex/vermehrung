export const teilkulturLabelFromTeilkultur = ({ teilkultur }) => {
  if (!teilkultur) return 'keine Teilkultur'

  return teilkultur?.name || 'kein Name'
}
