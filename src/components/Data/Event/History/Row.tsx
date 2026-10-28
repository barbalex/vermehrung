import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'
import { isEqual } from 'es-toolkit'

import { History } from '../../../shared/History/index.tsx'
import {
  userAtom,
  addNotification,
  dbAtom,
  apiClientAtom,
  store,
} from '../../../../store/index.ts'
import { checkForOnlineError } from '../../../../utils/checkForOnlineError.ts'
import { toPgArray } from '../../../../utils/toPgArray.ts'
import { createDataArrayForEventRevComparison } from '../createDataArrayForRevComparison.ts'

export const EventHistoryRow = ({
  row,
  revRow,
  historyTakeoverCallback,
}: {
  row: import('../../../../dbModel.ts').Event | null | undefined
  revRow: import('../../../shared/types.ts').RevRow | null | undefined
  historyTakeoverCallback?: () => void
}) => {
  const dataArray = createDataArrayForEventRevComparison({
    row,
    revRow,
  })

  const onClickWiderspruchUebernehmen = async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = ((row?._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      event_id: revRow?.event_id,
      kultur_id: revRow?.kultur_id,
      teilkultur_id: revRow?.teilkultur_id,
      person_id: revRow?.person_id,
      beschreibung: revRow?.beschreibung,
      geplant: revRow?.geplant,
      datum: revRow?.datum,
      _parent_rev: row?._rev,
      _depth: newDepth,
      _deleted: revRow?._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = toPgArray([
      rev,
      ...((row?._revisions as string[]) ?? []),
    ])
    const newObjectForStore = { ...newObject }
    //console.log('Event History', { row, revRow, newObject })
    try {
      await store
        .get(apiClientAtom)
        ?.post(
          '/event_rev',
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
    delete newObjectForStore.event_id
    // optimistically update store
    await store.get(dbAtom).write(async () => {
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
