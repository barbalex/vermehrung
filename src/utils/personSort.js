import personFullname from './personFullname.js'

const personSort = (a, b) => {
  const nameA = personFullname(a)?.toString()?.toLowerCase() ?? ''
  const nameB = personFullname(b)?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

export default personSort
