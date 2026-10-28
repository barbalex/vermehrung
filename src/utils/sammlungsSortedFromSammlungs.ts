import { sortBy } from 'es-toolkit'

import { sammlungIdsSortedFromSammlungs } from './sammlungIdsSortedFromSammlungs.ts'

export const sammlungsSortedFromSammlungs = async (sammlungs) => {
  const sammlungIdsSorted = await sammlungIdsSortedFromSammlungs(sammlungs)

  return sortBy(sammlungs, [
    (sammlung) => sammlungIdsSorted.findIndex((s) => s === sammlung.id),
  ])
}
