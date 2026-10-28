import { sortBy } from 'es-toolkit'

import { sammlungIdsSortedFromSammlungs } from './sammlungIdsSortedFromSammlungs.ts'
import type { Sammlung } from '../dbModel.ts'

export const sammlungsSortedFromSammlungs = async (sammlungs: Sammlung[]) => {
  const sammlungIdsSorted = await sammlungIdsSortedFromSammlungs(sammlungs)

  return sortBy(sammlungs, [
    (sammlung) => sammlungIdsSorted.findIndex((s) => s === sammlung.id),
  ])
}
