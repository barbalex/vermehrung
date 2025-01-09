export const teilkulturSort = (a, b) => {
  const nameA = a?.name?.toString()?.toLowerCase() ?? ''
  const nameB = b?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  const ort1A = a?.ort1?.toString()?.toLowerCase() ?? ''
  const ort1B = b?.ort1?.toString()?.toLowerCase() ?? ''
  if (ort1A < ort1B) return -1
  if (ort1A > ort1B) return 1

  const ort2A = a?.ort2?.toString()?.toLowerCase() ?? ''
  const ort2B = b?.ort2?.toString()?.toLowerCase() ?? ''
  if (ort2A < ort2B) return -1
  if (ort2A > ort2B) return 1

  const ort3A = a?.ort3?.toString()?.toLowerCase() ?? ''
  const ort3B = b?.ort3?.toString()?.toLowerCase() ?? ''
  if (ort3A < ort3B) return -1
  if (ort3A > ort3B) return 1

  return 0
}
