import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'
import { isEqual } from 'es-toolkit'

import { History } from '../../../shared/History/index.tsx'
import {
  store,
  dbAtom,
  apiClientAtom,
  userAtom,
  addNotification,
} from '../../../../store/index.ts'
import { checkForOnlineError } from '../../../../utils/checkForOnlineError.ts'
import { toPgArray } from '../../../../utils/toPgArray.ts'
import { createDataArrayForHerkunftRevComparison } from '../createDataArrayForRevComparison.ts'

export const HerkunftHistoryRow = ({
  row,
  revRow,
  historyTakeoverCallback,
}: {
  row: import('../../../../dbModel.ts').Herkunft | null | undefined
  revRow: import('../../../shared/types.ts').WmRow | null | undefined
  historyTakeoverCallback: () => void
}) => {
  const dataArray = createDataArrayForHerkunftRevComparison({
    row,
    revRow,
  })

  const onClickWiderspruchUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom) // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = ((row?._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      herkunft_id: revRow?.herkunft_id,
      nr: revRow?.nr,
      lokalname: revRow?.lokalname,
      gemeinde: revRow?.gemeinde,
      kanton: revRow?.kanton,
      land: revRow?.land,
      geom_point: revRow?.geom_point,
      bemerkungen: revRow?.bemerkungen,
      _parent_rev: row?._rev,
      _depth: newDepth,
      _deleted: revRow?._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = toPgArray([
      rev,
      ...((row?._revisions as string[]) ?? []),
    ])
    const newObjectForStore = { ...newObject }
    //console.log('Herkunft History', { row, revRow, newObject })
    try {
      await store
        .get(apiClientAtom)
        ?.post(
          '/herkunft_rev',
          newObject,
          'resolution=merge-duplicates,return=minimal',
        )
    } catch (error) {
      checkForOnlineError({ error: error })
      return addNotification({
        message: (error as Error).message,
      })
    }
    historyTakeoverCallback()
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = row?._revisions
      ? [rev, ...((row?._revisions as string[]) ?? [])]
      : [rev]
    // TODO: is this a good idea?
    newObjectForStore._conflicts = row?._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = row?.id
    delete newObjectForStore.herkunft_id
    // optimistically update store
    await db?.write(async () => {
      await row?.update((row: Record<string, unknown>) => {
        Object.entries(newObjectForStore).forEach(([key, value]) => {
          if (!isEqual(value, row[key])) {
            row[key] = value
          }
        })
      })
    })
  }

  return (
    <History
      rev={revRow?._rev}
      dataArray={dataArray}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
    />
  )
}
