import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'

import {
  store,
  userAtom,
  dbAtom,
  apiClientAtom,
  addNotification,
} from '../../../store/index.js'
import { useApiQuery } from '../../../utils/useApiQuery.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import { createDataArrayForSammlungRevComparison as createDataArray } from './createDataArrayForRevComparison.js'

export const SammlungConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  // need to use this query to ensure that the person's name is queried
  const { error, data, fetching } = useApiQuery(
    `/sammlung_rev?sammlung_id=eq.${id}&_rev=eq.${rev}&select=id,sammlung_id,art_id,person_id,herkunft_id,nr,datum,von_anzahl_individuen,anzahl_pflanzen,gramm_samen,andere_menge,geom_point,geplant,bemerkungen,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`,
  )
  error && checkForOnlineError({ error })

  const revRow = data?.[0] ?? {}

  const dataArray = createDataArray({ row, revRow })

  const onClickAktuellUebernehmen = async () => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      sammlung_id: revRow.sammlung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      datum: revRow.datum,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geom_point: revRow.geom_point,
      geplant: revRow.geplant,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    try {
    await store
      .get(apiClientAtom)
      .post('/sammlung_rev', newObject, 'resolution=merge-duplicates,return=minimal')
  } catch (error) {
          checkForOnlineError({ error: error })
      return addNotification({
        message: error.message,
  })
    }
    // update model: remove this conflict
    try {
      const model = await store
        .get(dbAtom)
        .get('sammlung')
        .find(revRow.sammlung_id)
      await model.removeConflict(revRow._rev)
    } catch {}
    conflictDisposalCallback()
  }

  const onClickWiderspruchUebernehmen = async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      sammlung_id: revRow.sammlung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      datum: revRow.datum,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geom_point: revRow.geom_point,
      geplant: revRow.geplant,
      bemerkungen: revRow.bemerkungen,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv7()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = store.get(userAtom).email
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    try {
    await store
      .get(apiClientAtom)
      .post('/sammlung_rev', newObject, 'resolution=merge-duplicates,return=minimal')
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
      name="Sammlung"
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
