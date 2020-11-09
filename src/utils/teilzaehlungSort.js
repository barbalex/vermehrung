import teilkulturSort from './teilkulturSort'

const teilzaehlungSort = ({ a, b, store }) => {
  const tkAId = a.teilkultur_id
  const tkA = tkAId ? store.teilkulturs.get(tkAId) : {}
  const tkBId = b.teilkultur_id
  const tkB = tkBId ? store.teilkulturs.get(tkBId) : {}

  return teilkulturSort({ a: tkA, b: tkB })
}

export default teilzaehlungSort
