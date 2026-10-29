import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'

import {
  addNotification,
  dbAtom,
  apiClientAtom,
  store,
  userAtom,
} from '../../../store/index.ts'
import { useApiQuery } from '../../../utils/useApiQuery.ts'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.ts'
import { toPgArray } from '../../../utils/toPgArray.ts'
import { Conflict } from '../../shared/Conflict/index.tsx'
import { createDataArrayForHerkunftRevComparison } from './createDataArrayForRevComparison.ts'

export const HerkunftConflict = ({
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}: {
  rev: string | boolean | null
  row: import('../../../dbModel.ts').Herkunft | null | undefined
  conflictDisposalCallback: () => void
  conflictSelectionCallback: () => void
  setActiveConflict: (conflict: string | null) => void
}) => {
  const { error, data, fetching } = useApiQuery(
    `/herkunft_rev?herkunft_id=eq.${row?.id}&_rev=eq.${rev}&select=id,bemerkungen,gemeinde,geom_point,herkunft_id,kanton,land,lokalname,nr,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  if (error) checkForOnlineError({ error })

  const revRow = ((
    data as import('../../shared/types.ts').RevRow[] | null
  )?.[0] ?? {}) as import('../../shared/types.ts').RevRow

  const dataArray = createDataArrayForHerkunftRevComparison({
    row: row as unknown as Record<string, unknown>,
    revRow,
  })

  const onClickAktuellUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom)
    // build new object
    const newDepth = ((revRow._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      lokalname: revRow.lokalname,
      gemeinde: revRow.gemeinde,
      kanton: revRow.kanton,
      land: revRow.land,
      geom_point: revRow.geom_point,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...(revRow._revisions as string[])])
      : toPgArray([rev])

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
    // update model: remove this conflict
    try {
      const model = (await db
        ?.get('herkunft')
        .find(revRow.herkunft_id as string)) as unknown as
        import('../../shared/types.ts').WmRow | undefined
      await model?.removeConflict?.(revRow._rev ?? '')
    } catch {}
    conflictDisposalCallback()
  }

  const onClickWiderspruchUebernehmen = async () => {
    const user = store.get(userAtom)
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = ((row?._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      lokalname: revRow.lokalname,
      gemeinde: revRow.gemeinde,
      kanton: revRow.kanton,
      land: revRow.land,
      geom_point: revRow.geom_point,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: row?._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = row?._revisions
      ? toPgArray([rev, ...((row?._revisions as string[]) ?? [])])
      : toPgArray([rev])
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
    // now we need to delete the previous conflict
    onClickAktuellUebernehmen()
    conflictSelectionCallback()
  }

  const onClickSchliessen = () => setActiveConflict(null)

  return (
    <Conflict
      name="Herkunft"
      rev={rev}
      dataArray={dataArray}
      dataArrayKey={JSON.stringify(dataArray)}
      fetching={fetching}
      error={error as Error | null}
      onClickAktuellUebernehmen={onClickAktuellUebernehmen}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}
