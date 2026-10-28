export const teilkulturLabelFromTeilkultur = ({
  teilkultur,
}: {
  teilkultur: {
    name?: string | null
    ort1?: string | null
    ort2?: string | null
    ort3?: string | null
  }
}) => {
  if (!teilkultur) return 'keine Teilkultur'

  return teilkultur?.name || 'kein Name'
}
