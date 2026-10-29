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
import { createDataArrayForSammellieferungRevComparison as createDataArray } from './createDataArrayForRevComparison.ts'

export const SammelLieferungConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}: {
  id: string | undefined
  rev: string | boolean | null
  row: import('../../../dbModel.ts').SammelLieferung | null | undefined
  conflictDisposalCallback: () => void
  conflictSelectionCallback: () => void
  setActiveConflict: (conflict: string | null) => void
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/sammel_lieferung_rev?sammel_lieferung_id=eq.${id}&_rev=eq.${rev}&select=id,sammel_lieferung_id,art_id,person_id,von_sammlung_id,von_kultur_id,datum,nach_kultur_id,nach_ausgepflanzt,von_anzahl_individuen,anzahl_pflanzen,anzahl_auspflanzbereit,gramm_samen,andere_menge,geplant,bemerkungen,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  if (error) checkForOnlineError({ error })

  const revRow = ((
    data as import('../../shared/types.ts').RevRow[] | null
  )?.[0] ?? {}) as import('../../shared/types.ts').RevRow

  const dataArray = createDataArray({
    row: row as unknown as Record<string, unknown>,
    revRow,
  })

  const onClickAktuellUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom)

    // build new object
    const newDepth = ((revRow._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      sammel_lieferung_id: revRow.sammel_lieferung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      von_sammlung_id: revRow.von_sammlung_id,
      von_kultur_id: revRow.von_kultur_id,
      datum: revRow.datum,
      nach_kultur_id: revRow.nach_kultur_id,
      nach_ausgepflanzt: revRow.nach_ausgepflanzt,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geplant: revRow.geplant,
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
          '/sammel_lieferung_rev',
          newObject,
          'resolution=merge-duplicates,return=minimal',
        )
    } catch (error) {
      checkForOnlineError({ error: error })
      return addNotification({
        message: (error as Error).message,
      })
    }
    // remove conflict from model
    try {
      const model = await db
        ?.get<import('../../../dbModel.ts').SammelLieferung>('sammel_lieferung')
        .find(revRow.sammel_lieferung_id as string)
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
      sammel_lieferung_id: revRow.sammel_lieferung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      von_sammlung_id: revRow.von_sammlung_id,
      von_kultur_id: revRow.von_kultur_id,
      datum: revRow.datum,
      nach_kultur_id: revRow.nach_kultur_id,
      nach_ausgepflanzt: revRow.nach_ausgepflanzt,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geplant: revRow.geplant,
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
          '/sammel_lieferung_rev',
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

  //console.log('SammelLieferung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Sammel-Lieferung"
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
