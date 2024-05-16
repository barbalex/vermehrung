import md5 from 'blueimp-md5'
import { DateTime } from 'luxon'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'

import toPgArray from '../../../../../utils/toPgArray.js'
import exists from '../../../../../utils/exists.js'

const lieferungRevFields = [
  'id',
  'lieferung_id',
  'sammel_lieferung_id',
  'art_id',
  'person_id',
  'von_sammlung_id',
  'von_kultur_id',
  'datum',
  'nach_kultur_id',
  'nach_ausgepflanzt',
  'von_anzahl_individuen',
  'anzahl_pflanzen',
  'anzahl_auspflanzbereit',
  'gramm_samen',
  'andere_menge',
  'geplant',
  'bemerkungen',
  'changed',
  'changed_by',
  '_rev',
  '_parent_rev',
  '_revisions',
  '_depth',
  '_deleted',
]
const lieferungFields = [
  'id',
  'sammel_lieferung_id',
  'art_id',
  'person_id',
  'von_sammlung_id',
  'von_kultur_id',
  'datum',
  'nach_kultur_id',
  'nach_ausgepflanzt',
  'von_anzahl_individuen',
  'anzahl_pflanzen',
  'anzahl_auspflanzbereit',
  'gramm_samen',
  'andere_menge',
  'geplant',
  'bemerkungen',
  'changed',
  'changed_by',
  '_rev',
  '_parent_rev',
  '_revisions',
  '_depth',
  '_conflicts',
  '_deleted',
]

const updateLieferung = async ({
  lieferung,
  sammelLieferung,
  store,
  field,
}) => {
  const { addQueuedQuery, db, user } = store
  console.log('updateLieferung, lieferung:', lieferung)
  // pass field to mark which field should be updated
  // even if it has value null
  const newValuesFromSl = Object.fromEntries(
    Object.entries(sammelLieferung)
      .filter(
        // only accept lieferung's fields
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => lieferungRevFields.includes(key),
      )
      // only update with existing values
      // eslint-disable-next-line no-unused-vars
      .filter(([key, val]) => {
        if (field) return key === field
        return exists(val)
      }),
  )
  // need to query existing object to get revisions
  const lfLastVersion = lieferung
  const oldValuesFromL = Object.fromEntries(
    Object.entries(lfLastVersion).filter(
      // only accept lieferung's fields
      // eslint-disable-next-line no-unused-vars
      ([key, value]) => lieferungFields.includes(key),
    ),
  )
  const newObject = {
    ...oldValuesFromL,
    ...newValuesFromSl,
    id: uuidv1(),
    lieferung_id: lieferung.id,
    sammel_lieferung_id: sammelLieferung.id,
  }
  delete newObject._conflicts
  delete newObject.__typename
  const depth = lfLastVersion._depth + 1
  newObject.changed = DateTime.local().toFormat('yyyy.LL.dd')
  newObject.changed_by = user.email
  newObject._parent_rev = lfLastVersion._rev
  newObject._depth = depth
  const rev = `${depth}-${md5(JSON.stringify(newObject))}`
  newObject._rev = rev
  const newObjectForStore = { ...newObject }
  // convert array to string as hasura does not support arrays yet
  // https://github.com/hasura/graphql-engine/pull/2243
  newObject._revisions = lfLastVersion._revisions
    ? toPgArray([rev, ...lfLastVersion._revisions])
    : toPgArray([rev])
  addQueuedQuery({
    name: 'mutateInsert_lieferung_rev_one',
    variables: JSON.stringify({
      object: newObject,
      on_conflict: {
        constraint: 'lieferung_rev_pkey',
        update_columns: ['id'],
      },
    }),
    revertTable: 'lieferung',
    revertId: lieferung.id,
    revertValues: JSON.stringify(newObject),
  })
  // optimistically update store
  newObjectForStore._revisions = lfLastVersion._revisions
    ? [rev, ...lfLastVersion._revisions]
    : [rev]
  newObjectForStore._conflicts = lfLastVersion._conflicts
  newObjectForStore.id = lfLastVersion.id
  delete newObjectForStore.lieferung_id
  await db.write(async () => {
    await lieferung.update((row) => {
      Object.entries(newObjectForStore).forEach(([key, value]) => {
        if (!isEqual(value, row[key])) {
          row[key] = value
        }
      })
    })
  })
}

export default updateLieferung
