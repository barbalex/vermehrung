import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'
import { isEqual } from 'es-toolkit'

import { History } from '../../../shared/History/index.tsx'
import {
  addNotification,
  dbAtom,
  apiClientAtom,
  store,
  userAtom,
} from '../../../../store/index.ts'
import { checkForOnlineError } from '../../../../utils/checkForOnlineError.ts'
import { toPgArray } from '../../../../utils/toPgArray.ts'
import { createDataArrayForGartenRevComparison } from '../createDataArrayForRevComparison.ts'

export const GartenHistoryRow = ({
  row,
  revRow,
  historyTakeoverCallback,
}: {
  row: import('../../../../dbModel.ts').Garten | null | undefined
  revRow: import('../../../shared/types.ts').RevRow | null | undefined
  historyTakeoverCallback?: () => void
}) => {
  const dataArray = createDataArrayForGartenRevComparison({
    row: row as unknown as Record<string, unknown>,
    revRow,
  })

  const onClickWiderspruchUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom)
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = ((row?._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      garten_id: revRow?.garten_id,
      name: revRow?.name,
      person_id: revRow?.person_id,
      strasse: revRow?.strasse,
      plz: revRow?.plz,
      ort: revRow?.ort,
      geom_point: revRow?.geom_point,
      aktiv: revRow?.aktiv,
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
    //console.log('Kultur History', { row, revRow, newObject })
    try {
      await store
        .get(apiClientAtom)
        ?.post(
          '/garten_rev',
          newObject,
          'resolution=merge-duplicates,return=minimal',
        )
    } catch (error) {
      checkForOnlineError({ error: error })
      return addNotification({
        message: (error as Error).message,
      })
    }
    historyTakeoverCallback?.()
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = row?._revisions
      ? [rev, ...((row?._revisions as string[]) ?? [])]
      : [rev]
    // TODO: is this a good idea?
    newObjectForStore._conflicts = row?._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = row?.id
    delete newObjectForStore.garten_id
    // optimistically update store
    await db?.write(async () => {
      await row?.update(
        (row: unknown) => {
          const mutableRow = row as Record<string, unknown>
          Object.entries(newObjectForStore).forEach(([key, value]) => {
            if (!isEqual(value, mutableRow[key])) {
              mutableRow[key] = value
            }
          })
        },
      )
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
