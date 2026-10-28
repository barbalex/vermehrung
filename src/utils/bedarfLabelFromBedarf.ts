export const bedarfLabelFromBedarf = ({ bedarf }) => {
  if (!bedarf?.id) return 'kein Bedarf'
  const jahrLabel = bedarf.jahr ?? 'Kein Jahr'
  const beschreibungLabel = bedarf?.beschreibung ?? 'nicht beschrieben'
  const label = [jahrLabel, beschreibungLabel].join(': ')

  return label
}
