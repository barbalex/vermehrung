import artLabelFromArt from './artLabelFromArt'

export default ({ a, b, store }) => {
  const nameA = artLabelFromArt({ art: a, store }).toLowerCase()
  const nameB = artLabelFromArt({ art: b, store }).toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
