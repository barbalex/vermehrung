import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { art_revModelBase } from './art_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for art_revModel */
export {
  selectFromart_rev,
  art_revModelPrimitives,
  art_revModelSelector,
} from './art_revModel.base'

/**
 * art_revModel
 *
 * columns and relationships of "art_rev"
 */
export const art_revModel = art_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteArtRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      art_id: self.art_id,
      ae_id: self.ae_id,
      _parent_rev: self._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = self._revisions
      ? toPgArray([rev, ...self._revisions])
      : toPgArray([rev])

    addQueuedQuery({
      name: 'mutateInsert_art_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'art',
      revertId: self.art_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteArtRevModel(self)
  },
}))
