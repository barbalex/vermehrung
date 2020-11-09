import artLabelFromEvent from './artLabelFromEvent'

const avSort = ({ a, b, store }) => {
  const nameA = artLabelFromEvent({ event: a, store })
  const nameB = artLabelFromEvent({ event: b, store })
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

export default avSort
