import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest } from 'rxjs'
import type { Model } from 'nitromelondb'
import type { Clause } from 'nitromelondb/QueryDescription'

import { dbAtom, filterTableAtoms, type TableName } from '../store/index.ts'
import { tableFilter } from './tableFilter.ts'
import { triStateDeletedQuery } from './triStateDeletedQuery.ts'

// the shared entity-list wiring: the count query (tri-state _deleted
// plus extra clauses like hierarchy joins), the data query (the table
// filter plus the same extra clauses) and the sort. Every plural list
// under Data/ follows this shape - the hook keeps them consistent
// (observeWithColumns once betrayed three lists with herkunft's
// columns).
export const useEntityList = <T extends Model>({
  table,
  observeColumns,
  sort,
  // extra Q clauses applied to BOTH queries: hierarchy joins per active
  // url ids, additional tri-state filters (e.g. person.aktiv). Receives
  // the table's current filter values.
  buildClauses,
  // values the clause builder closes over (active ids from the url) -
  // a change re-subscribes
  clauseDeps = [],
}: {
  table: TableName
  // the row's own columns the list must re-emit on (label/sort fields)
  observeColumns: string[]
  // sync or async (label-based sorts await row labels)
  sort: (rows: T[]) => T[] | Promise<T[]>
  buildClauses?: (filter: Record<string, unknown>) => Clause[]
  clauseDeps?: unknown[]
}) => {
  const db = useAtomValue(dbAtom)
  const filter = useAtomValue(filterTableAtoms[table])
  const [rows, setRows] = useState<T[]>([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const collection = db?.get<T>(table)
    if (!collection) return
    const extraClauses = buildClauses?.(filter) ?? []
    const countObservable = collection
      .query(triStateDeletedQuery(filter._deleted), ...extraClauses)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table }), ...extraClauses)
      .observeWithColumns(observeColumns)
    const subscription = combineLatest([
      countObservable,
      dataObservable,
    ]).subscribe(async ([count, newRows]) => {
      setTotalCount(count)
      setRows(await sort([...newRows]))
    })

    return () => subscription.unsubscribe()
    // clauseDeps covers the values buildClauses closes over
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, filter, ...clauseDeps])

  return { rows, totalCount, filteredCount: rows.length }
}
