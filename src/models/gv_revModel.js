import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { gv_revModelBase } from './gv_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for gv_revModel */
export {
  selectFromgv_rev,
  gv_revModelPrimitives,
  gv_revModelSelector,
} from './gv_revModel.base'

/**
 * gv_revModel
 */
export const gv_revModel = gv_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteGvRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      gv_id: self.gv_id,
      garten_id: self.garten_id,
      person_id: self.person_id,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
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
      revertId: self.gv_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteGvRevModel(self)
  },
}))
