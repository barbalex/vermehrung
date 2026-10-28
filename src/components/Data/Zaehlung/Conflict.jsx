import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'

import {
  addNotification,
  dbAtom,
  apiClientAtom,
  store,
  userAtom,
} from '../../../store/index.js'
import { useApiQuery } from '../../../utils/useApiQuery.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import { createDataArrayForZaehlungRevComparison as createDataArray } from './createDataArrayForRevComparison.js'

export const ZaehlungConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/zaehlung_rev?zaehlung_id=eq.${id}&_rev=eq.${rev}&select=id,zaehlung_id,kultur_id,datum,prognose,bemerkungen,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  error && checkForOnlineError({ error })

  const revRow = data?.[0] ?? {}

  const dataArray = createDataArray({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    const user = store.get(userAtom)
    const db = store.get(dbAtom)
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      zaehlung_id: revRow.zaehlung_id,
      kultur_id: revRow.kultur_id,
      datum: revRow.datum,
      prognose: revRow.prognose,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    try {
    await store
      .get(apiClientAtom)
      .post('/zaehlung_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: error.message,
  })
    }
    // update model: remove this conflict
    try {
      const model = await db.get('zaehlung').find(revRow.zaehlung_id)
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
      zaehlung_id: revRow.zaehlung_id,
      kultur_id: revRow.kultur_id,
      datum: revRow.datum,
      prognose: revRow.prognose,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    try {
    await store
      .get(apiClientAtom)
      .post('/zaehlung_rev', newObject, 'resolution=merge-duplicates,return=minimal')
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

  //console.log('Zaehlung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Zaehlung"
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
