import sortBy from 'lodash/sortBy'
import personFullname from './personFullname'

const gartensSortedFromGartens = async (gartens) => {
  const gartenSorters = await Promise.all(
    gartens.map(async (garten) => {
      const name = garten?.name?.toString()?.toLowerCase() ?? ''
      const person = await garten.person.fetch()
      const personName = personFullname(person)?.toString()?.toLowerCase()
      const sort = [name, personName]

      return { id: garten.id, sort }
    }),
  )
  const gartensSorted = sortBy(
    gartens,
    (garten) => gartenSorters.find((s) => s.id === garten.id).sort,
  )
  return gartensSorted
}

export default gartensSortedFromGartens
