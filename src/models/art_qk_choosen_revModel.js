import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { art_qk_choosen_revModelBase } from './art_qk_choosen_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for art_qk_choosen_revModel */
export {
  selectFromart_qk_choosen_rev,
  art_qk_choosen_revModelPrimitives,
  art_qk_choosen_revModelSelector,
} from './art_qk_choosen_revModel.base'

/**
 * art_qk_choosen_revModel
 */
export const art_qk_choosen_revModel = art_qk_choosen_revModelBase.actions(
  (self) => ({
    setDeleted() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, deleteArtQkChoosenRevModel } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
        art_qk_choosen_id: self.art_qk_choosen_id,
        art_id: self.art_id,
        qk_name: self.qk_name,
        choosen: self.choosen,
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
        name: 'mutateInsert_art_qk_choosen_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'art_qk_choosen_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryArt_qk_choosen',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: self.id } },
        }),
        revertTable: 'art_qk_choosen',
        revertId: self.art_qk_choosen_id,
        revertField: '_deleted',
        revertValue: false,
      })
      deleteArtQkChoosenRevModel(self)
    },
  }),
)
