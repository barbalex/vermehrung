const compareLabel = (a: { label?: unknown }, b: { label?: unknown }) => {
  // catch if label is null
  if (!b.label && !a.label) return 0
  if (!b.label) return -1
  if (!a.label) return 1

  if (String(a.label).toLowerCase() < String(b.label).toLowerCase()) {
    return -1
  } else if (String(a.label).toLowerCase() > String(b.label).toLowerCase()) {
    return 1
  }
  return 0
}

export default compareLabel
