import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import {
  store,
  userAtom,
  addNotification,
  dbAtom,
  apiClientAtom,
} from '../../../store/index.js'
import { useApiQuery } from '../../../utils/useApiQuery.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import { createDataArrayForBedarfRevComparison } from './createDataArrayForRevComparison.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'

export const BedarfConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/bedarf_rev?bedarf_id=eq.${id}&_rev=eq.${rev}&select=id,bedarf_id,kultur_id,person_id,jahr,beschreibung,bemerkungen,neues_material,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  error && checkForOnlineError({ error })

  const revRow = data?.[0] ?? {}

  const dataArray = createDataArrayForBedarfRevComparison({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom)

    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      bedarf_id: revRow.bedarf_id,
      kultur_id: revRow.kultur_id,
      person_id: revRow.person_id,
      jahr: revRow.jahr,
      beschreibung: revRow.beschreibung,
      bemerkungen: revRow.bemerkungen,
      neues_material: revRow.neues_material,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    try {
    await store
      .get(apiClientAtom)
      .post('/bedarf_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: error.message,
  })
    }
    // update model: remove this conflict
    try {
      const model = await db.get('bedarf').find(revRow.bedarf_id)
      await model.removeConflict(revRow._rev)
    } catch {}
    conflictDisposalCallback()
  }

  const onClickWiderspruchUebernehmen = async () => {
    const user = store.get(userAtom)
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      bedarf_id: revRow.bedarf_id,
      kultur_id: revRow.kultur_id,
      person_id: revRow.person_id,
      jahr: revRow.jahr,
      beschreibung: revRow.beschreibung,
      bemerkungen: revRow.bemerkungen,
      neues_material: revRow.neues_material,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    try {
    await store
      .get(apiClientAtom)
      .post('/bedarf_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: error.message,
  })
    }
    // now we need to delete the previous conflict
    onClickAktuellUebernehmen()
    conflictSelectionCallback()
  }

  const onClickSchliessen = () => setActiveConflict(null)

  return (
    <Conflict
      name="Bedarf"
      rev={rev}
      dataArray={dataArray}
      fetching={fetching}
      error={error}
      onClickAktuellUebernehmen={onClickAktuellUebernehmen}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}
