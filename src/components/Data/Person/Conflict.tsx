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
import { createDataArrayForPersonRevComparison as createDataArray } from './createDataArrayForRevComparison.ts'

export const PersonConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}: {
  id: string | undefined
  rev: string | boolean | null
  row: import('../../../dbModel.ts').Person | null | undefined
  conflictDisposalCallback: () => void
  conflictSelectionCallback: () => void
  setActiveConflict: (conflict: string | null) => void
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/person_rev?person_id=eq.${id}&_rev=eq.${rev}&select=id,person_id,nr,vorname,name,adresszusatz,strasse,plz,ort,telefon_privat,telefon_geschaeft,telefon_mobile,email,kein_email,bemerkungen,aktiv,user_role_id,kommerziell,info,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  if (error) checkForOnlineError({ error })

  const revRow = ((
    data as import('../../shared/types.ts').RevRow[] | null
  )?.[0] ?? {}) as import('../../shared/types.ts').RevRow

  const dataArray = createDataArray({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom)
    // build new object
    const newDepth = ((revRow._depth as number) ?? 0) + 1
    const newObject: Record<string, unknown> = {
      person_id: revRow.person_id,
      nr: revRow.nr,
      vorname: revRow.vorname,
      name: revRow.name,
      adresszusatz: revRow.adresszusatz,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      telefon_privat: revRow.telefon_privat,
      telefon_geschaeft: revRow.telefon_geschaeft,
      telefon_mobile: revRow.telefon_mobile,
      email: revRow.email,
      kein_email: revRow.kein_email,
      bemerkungen: revRow.bemerkungen,
      account_id: revRow.account_id,
      user_role_id: revRow.user_role_id,
      kommerziell: revRow.kommerziell,
      info: revRow.info,
      aktiv: revRow.aktiv,
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
          '/person_rev',
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
      const model = (await db
        ?.get('person')
        .find(revRow.person_id as string)) as unknown as
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
      person_id: revRow.person_id,
      nr: revRow.nr,
      vorname: revRow.vorname,
      name: revRow.name,
      adresszusatz: revRow.adresszusatz,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      telefon_privat: revRow.telefon_privat,
      telefon_geschaeft: revRow.telefon_geschaeft,
      telefon_mobile: revRow.telefon_mobile,
      email: revRow.email,
      kein_email: revRow.kein_email,
      bemerkungen: revRow.bemerkungen,
      account_id: revRow.account_id,
      user_role_id: revRow.user_role_id,
      kommerziell: revRow.kommerziell,
      info: revRow.info,
      aktiv: revRow.aktiv,
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
          '/person_rev',
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
      name="Person"
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
