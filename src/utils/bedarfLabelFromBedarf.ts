export const bedarfLabelFromBedarf = ({
  bedarf,
}: {
  bedarf: {
    id?: string
    jahr?: number | null
    beschreibung?: string | null
  } | null
}) => {
  if (!bedarf?.id) return 'kein Bedarf'
  const jahrLabel = bedarf.jahr ?? 'Kein Jahr'
  const beschreibungLabel = bedarf?.beschreibung ?? 'nicht beschrieben'
  const label = [jahrLabel, beschreibungLabel].join(': ')

  return label
}
