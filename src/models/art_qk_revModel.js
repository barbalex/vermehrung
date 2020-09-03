import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { art_qk_revModelBase } from './art_qk_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for art_qk_revModel */
export {
  selectFromart_qk_rev,
  art_qk_revModelPrimitives,
  art_qk_revModelSelector,
} from './art_qk_revModel.base'

/**
 * art_qk_revModel
 */
export const art_qk_revModel = art_qk_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteArtQkRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      art_qk_id: self.art_qk_id,
      name: self.name,
      titel: self.titel,
      beschreibung: self.beschreibung,
      sort: self.sort,
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
      name: 'mutateInsert_art_qk_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_qk_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'art_qk',
      revertId: self.art_qk_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteArtQkRevModel(self)
  },
}))
