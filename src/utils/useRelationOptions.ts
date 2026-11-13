import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { uniqBy } from 'es-toolkit'
import type { Model } from 'nitromelondb'
import type { Clause } from 'nitromelondb/QueryDescription'

import { dbAtom, filterTableAtoms, type TableName } from '../store/index.ts'
import { triStateDeletedQuery } from './triStateDeletedQuery.ts'

// the shared relation-options wiring behind every Select in the forms:
// observe the related table (tri-state _deleted filtered), merge the
// currently chosen row so the select shows it even when filtered away,
// sort, then build the option objects (async - label-based sorting and
// labels await row observables)
export const useRelationOptions = <T extends Model, Opt>({
  table,
  chosenRow,
  showFilter,
  sort,
  buildOption,
  // extra clauses for the query, e.g. hierarchy restriction
  extraClauses,
}: {
  table: TableName
  // the row currently referenced by the form, if any
  chosenRow?: T | null | undefined
  showFilter?: boolean
  sort: (rows: T[]) => T[] | Promise<T[]>
  buildOption: (row: T) => Opt | Promise<Opt>
  extraClauses?: Clause[]
}) => {
  const db = useAtomValue(dbAtom)
  const filter = useAtomValue(filterTableAtoms[table])
  const [options, setOptions] = useState<Opt[]>([])

  useEffect(() => {
    const collection = db?.get<T>(table)
    if (!collection) return
    const subscription = collection
      .query(triStateDeletedQuery(filter._deleted), ...(extraClauses ?? []))
      .observe()
      .subscribe(async (rows) => {
        const rowsIncludingChosen = uniqBy(
          [...rows, ...(chosenRow && !showFilter ? [chosenRow] : [])],
          (e) => e.id,
        )
        const sorted = await sort(rowsIncludingChosen)
        setOptions(await Promise.all(sorted.map((row) => buildOption(row))))
      })

    return () => subscription.unsubscribe()
    // the pattern's original deps: db, the deleted filter, the chosen
    // row's relation and the filter flag. extraClauses callers pass
    // stable clauses or accept a stale subscription until a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, filter._deleted, chosenRow, showFilter])

  return options
}
