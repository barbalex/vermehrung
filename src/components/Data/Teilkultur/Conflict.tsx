import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'

import {
  store,
  userAtom,
  addNotification,
  dbAtom,
  apiClientAtom,
} from '../../../store/index.ts'
import { useApiQuery } from '../../../utils/useApiQuery.ts'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.ts'
import { toPgArray } from '../../../utils/toPgArray.ts'
import { Conflict } from '../../shared/Conflict/index.tsx'
import { createDataArrayForTeilkulturRevComparison as createDataArray } from './createDataArrayForRevComparison.ts'

export const TeilkulturConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}: {
  id: string | undefined
  rev: string | boolean | null
  row: import('../../shared/types.ts').Teilkultur | null | undefined
  conflictDisposalCallback: () => void
  conflictSelectionCallback: () => void
  setActiveConflict: (conflict: string | null) => void
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/teilkultur_rev?teilkultur_id=eq.${id}&_rev=eq.${rev}&select=id,teilkultur_id,kultur_id,name,ort1,ort2,ort3,bemerkungen,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
    if (error) checkForOnlineError({ error })

  const revRow = ((data as import('../../shared/types.ts').RevRow[] | null)?.[0] ?? {}) as import('../../shared/types.ts').RevRow

  const dataArray = createDataArray({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    // build new object
    const newDepth = ((revRow._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      teilkultur_id: revRow.teilkultur_id,
      kultur_id: revRow.kultur_id,
      name: revRow.name,
      ort1: revRow.ort1,
      ort2: revRow.ort2,
      ort3: revRow.ort3,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...(revRow._revisions as string[])])
      : toPgArray([rev])

    try {
    await store
      .get(apiClientAtom)
      ?.post('/teilkultur_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: (error as Error).message,
  })
    }
    // update model: remove this conflict
    try {
      const db = store.get(dbAtom)
      const model = (await db?.get('teilkultur').find(revRow.teilkultur_id as string)) as unknown as import('../../shared/types.ts').WmRow | undefined
      await model?.removeConflict?.(revRow._rev ?? '')
    } catch {}
    conflictDisposalCallback()
  }

  const onClickWiderspruchUebernehmen = async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = (((row?._depth as number) ?? 0)) + 1
    const newObject: Record<string, unknown> = {
      teilkultur_id: revRow.teilkultur_id,
      kultur_id: revRow.kultur_id,
      name: revRow.name,
      ort1: revRow.ort1,
      ort2: revRow.ort2,
      ort3: revRow.ort3,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: row?._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = row?._revisions
      ? toPgArray([rev, ...((row?._revisions as string[]) ?? [])])
      : toPgArray([rev])
    try {
    await store
      .get(apiClientAtom)
      ?.post('/teilkultur_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: (error as Error).message,
  })
    }
    // now we need to delete the previous conflict
    onClickAktuellUebernehmen()
    conflictSelectionCallback()
  }

  const onClickSchliessen = () => setActiveConflict(null)

  return (
    <Conflict
      name="Teilkultur"
      rev={rev}
      dataArray={dataArray}
      fetching={fetching}
      error={error as Error | null}
      onClickAktuellUebernehmen={onClickAktuellUebernehmen}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}
