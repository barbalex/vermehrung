const compareLabel = (a, b) => {
  // catch if label is null
  if (!b.label && !a.label) return 0
  if (!b.label) return -1
  if (!a.label) return 1

  if (a.label.toLowerCase() < b.label.toLowerCase()) {
    return -1
  } else if (a.label.toLowerCase() > b.label.toLowerCase()) {
    return 1
  }
  return 0
}

export default compareLabel
