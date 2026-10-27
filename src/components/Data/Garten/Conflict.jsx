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
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import { createDataArrayForGartenRevComparison } from './createDataArrayForRevComparison.js'

export const GartenConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  const { error, data, fetching } = useApiQuery(
    `/garten_rev?garten_id=eq.${id}&_rev=eq.${rev}&select=id,garten_id,name,strasse,plz,ort,geom_point,aktiv,bemerkungen,changed,changed_by,person_id,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  error && checkForOnlineError({ error })

  const revRow = data?.[0] ?? {}

  const dataArray = createDataArrayForGartenRevComparison({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      garten_id: revRow.garten_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    try {
    await store
      .get(apiClientAtom)
      .post('/garten_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: error.message,
  })
    }
    // update model: remove this conflict
    try {
      const db = store.get(dbAtom)
      const model = await db.get('garten').find(revRow.garten_id)
      await model.removeConflict(revRow._rev)
    } catch {}
    conflictDisposalCallback()
  }

  const onClickWiderspruchUebernehmen = async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      garten_id: revRow.garten_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    //console.log('Garten Conflict', { row, revRow, newObject })
    try {
    await store
      .get(apiClientAtom)
      .post('/garten_rev', newObject, 'resolution=merge-duplicates,return=minimal')
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

  //console.log('Garten Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Garten"
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
