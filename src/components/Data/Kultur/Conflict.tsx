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
import { createDataArrayForKulturRevComparison } from './createDataArrayForRevComparison.ts'

export const KulturConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}: {
  id: string | undefined
  rev: string | boolean | null
  row: import('../../../dbModel.ts').Kultur | null | undefined
  conflictDisposalCallback: () => void
  conflictSelectionCallback: () => void
  setActiveConflict: (conflict: string | null) => void
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/kultur_rev?kultur_id=eq.${id}&_rev=eq.${rev}&select=id,kultur_id,art_id,herkunft_id,garten_id,zwischenlager,erhaltungskultur,von_anzahl_individuen,bemerkungen,aktiv,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  if (error) checkForOnlineError({ error })

  const revRow = ((
    data as import('../../shared/types.ts').RevRow[] | null
  )?.[0] ?? {}) as import('../../shared/types.ts').RevRow

  const dataArray = createDataArrayForKulturRevComparison({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    // build new object
    const newDepth = ((revRow._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      kultur_id: revRow.kultur_id,
      art_id: revRow.art_id,
      herkunft_id: revRow.herkunft_id,
      garten_id: revRow.garten_id,
      zwischenlager: revRow.zwischenlager,
      erhaltungskultur: revRow.erhaltungskultur,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      bemerkungen: revRow.bemerkungen,
      aktiv: revRow.aktiv,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...(revRow._revisions as string[])])
      : toPgArray([rev])

    try {
      await store
        .get(apiClientAtom)
        ?.post(
          '/kultur_rev',
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
      const db = store.get(dbAtom)
      const model = (await db
        ?.get('kultur')
        .find(revRow.kultur_id as string)) as unknown as
        import('../../shared/types.ts').WmRow | undefined
      await model?.removeConflict?.(revRow._rev ?? '')
    } catch {}
    conflictDisposalCallback()
  }

  const onClickWiderspruchUebernehmen = async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = ((row?._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      kultur_id: revRow.kultur_id,
      art_id: revRow.art_id,
      herkunft_id: revRow.herkunft_id,
      garten_id: revRow.garten_id,
      zwischenlager: revRow.zwischenlager,
      erhaltungskultur: revRow.erhaltungskultur,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      bemerkungen: revRow.bemerkungen,
      aktiv: revRow.aktiv,
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
        ?.post(
          '/kultur_rev',
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
      name="Kultur"
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
