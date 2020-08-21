import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { gvModelBase } from './gvModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for gvModel */
export {
  selectFromgv,
  gvModelPrimitives,
  gvModelSelector,
} from './gvModel.base'

/**
 * gvModel
 */
export const gvModel = gvModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertGvModel, unsetError } = store

    unsetError(`gv.${field}`)
    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      gv_id: self.id,
      garten_id: field === 'garten_id' ? value : self.garten_id,
      person_id: field === 'person_id' ? value : self.person_id,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : self._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_gv_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'gv_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryGv',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'gv',
      revertId: self.id,
      revertField: field,
      revertValue: self[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    newObjectForStore._conflicts = self._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = self.id
    delete newObjectForStore.gv_id
    // optimistically update store
    upsertGvModel(newObjectForStore)
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
