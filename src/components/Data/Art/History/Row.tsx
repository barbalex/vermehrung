import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'
import { isEqual } from 'es-toolkit'

import { History } from '../../../shared/History/index.tsx'
import {
  store,
  userAtom,
  addNotification,
  dbAtom,
  apiClientAtom,
} from '../../../../store/index.ts'
import { checkForOnlineError } from '../../../../utils/checkForOnlineError.ts'
import { toPgArray } from '../../../../utils/toPgArray.ts'
import { createDataArrayForRevComparison } from '../createDataArrayForRevComparison.ts'

export const Row = ({
  row,
  revRow,
  historyTakeoverCallback,
}: {
  row: import('../../../shared/types.ts').Art | null | undefined
  revRow: import('../../../shared/types.ts').RevRow | null | undefined
  historyTakeoverCallback?: () => void
}) => {
  const dataArray = createDataArrayForRevComparison({ row, revRow })

  const onClickWiderspruchUebernehmen = async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = ((row?._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
      set: revRow.set,
      apflora_av: revRow.apflora_av,
      apflora_ap: revRow.apflora_ap,
      _parent_rev: row?._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = toPgArray([rev, ...((row?._revisions as string[]) ?? [])])
    const newObjectForStore = { ...newObject }
    try {
    await store
      .get(apiClientAtom)
      ?.post('/art_rev', newObject, 'resolution=merge-duplicates,return=minimal')
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
    newObjectForStore.id = row.id
    delete newObjectForStore.kultur_id
    // optimistically update store
    const db = store.get(dbAtom)
    await db?.write(async () => {
      await row.update((row: Record<string, unknown>) => {
        Object.entries(newObjectForStore).forEach(([key, value]) => {
          if (!isEqual(value, row[key])) {
            row[key] = value
          }
        })
      })
    })
  }

  // console.log('Art History row', { revRow, row, dataArray })

  return (
    <History
      rev={revRow._rev}
      dataArray={dataArray}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
    />
  )
}
