import md5 from 'blueimp-md5'
import moment from 'moment'
import { v1 as uuidv1 } from 'uuid'

import {
  lieferung_rev as lieferungRevFragment,
  lieferung as lieferungFragment,
} from '../../../../../utils/fragments'
import fieldsFromFragment from '../../../../../utils/fieldsFromFragment'
import toPgArray from '../../../../../utils/toPgArray'
import exists from '../../../../../utils/exists'

const lieferungRevFields = fieldsFromFragment(lieferungRevFragment)
const lieferungFields = fieldsFromFragment(lieferungFragment)

export default async ({ lieferungId, sammelLieferung, store, field }) => {
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
  const lfLastVersion = store.lieferungs.get(lieferungId)
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
    lieferung_id: lieferungId,
    sammel_lieferung_id: sammelLieferung.id,
  }
  delete newObject._conflicts
  delete newObject.__typename
  const depth = lfLastVersion._depth + 1
  newObject.changed = moment().format('YYYY-MM-DD')
  newObject.changed_by = store.user.email
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
  store.addQueuedQuery({
    name: 'mutateInsert_lieferung_rev_one',
    variables: JSON.stringify({
      object: newObject,
      on_conflict: {
        constraint: 'lieferung_rev_pkey',
        update_columns: ['id'],
      },
    }),
    callbackQuery: 'queryLieferung',
    callbackQueryVariables: JSON.stringify({
      where: { id: { _eq: lieferungId } },
    }),
    revertTable: 'lieferung',
    revertId: lieferungId,
    revertValues: JSON.stringify(newObject),
  })
  // optimistically update store
  newObjectForStore._revisions = lfLastVersion._revisions
    ? [rev, ...lfLastVersion._revisions]
    : [rev]
  newObjectForStore._conflicts = lfLastVersion._conflicts
  newObjectForStore.id = lfLastVersion.id
  delete newObjectForStore.lieferung_id
  store.upsertLieferungModel(newObjectForStore)
}
