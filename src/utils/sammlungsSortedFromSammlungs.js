import sortBy from 'lodash/sortBy'

import { sammlungIdsSortedFromSammlungs } from './sammlungIdsSortedFromSammlungs.js'

export const sammlungsSortedFromSammlungs = async (sammlungs) => {
  const sammlungIdsSorted = await sammlungIdsSortedFromSammlungs(sammlungs)

  return sortBy(sammlungs, (sammlung) =>
    sammlungIdsSorted.findIndex((s) => s.id === sammlung.id),
  )
}
