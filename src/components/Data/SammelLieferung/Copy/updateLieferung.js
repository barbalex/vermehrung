import md5 from 'blueimp-md5'
import moment from 'moment'

import { lieferung as lieferungFragment } from '../../../../utils/fragments'
import fieldsFromFragment from '../../../../utils/fieldsFromFragment'
import toPgArray from '../../../../utils/toPgArray'

const lieferungFields = fieldsFromFragment(lieferungFragment)

export default async ({ lieferungId, sammelLieferung, store }) => {
  // pass field to mark which field should be updated
  // even if it has value null
  const lieferung = {
    ...sammelLieferung,
    id: lieferungId,
    sammel_lieferung_id: sammelLieferung.id,
  }
  const newObject = Object.fromEntries(
    Object.entries(lieferung).filter(
      // only accept lieferung's fields
      // eslint-disable-next-line no-unused-vars
      ([key, value]) => lieferungFields.includes(key),
    ),
    // only update with existing values
    // eslint-disable-next-line no-unused-vars
    //.filter(([key, val]) => exists(val) || key === field),
  )
  // need to query existing object to get revisions
  const lfLastVersion = store.lieferungs.get(lieferungId)
  const depth = lfLastVersion._depth + 1
  newObject.changed = moment().format('YYYY-MM-DD')
  newObject.changed_by = store.user.email
  newObject._parent_rev = lfLastVersion._rev
  newObject._depth = depth
  const rev = `${depth}-${md5(JSON.stringify(newObject))}`
  newObject._rev = rev
  // convert array to string as hasura does not support arrays yet
  // https://github.com/hasura/graphql-engine/pull/2243
  newObject._revisions = lfLastVersion._revisions
    ? toPgArray([rev, ...lfLastVersion._revisions])
    : toPgArray([rev])
  store.addQueuedQuery({
    name: 'mutateInsert_lieferung_rev',
    variables: JSON.stringify({
      objects: [newObject],
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
}
