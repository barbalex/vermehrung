import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_qk_choosen_revModelBase } from './kultur_qk_choosen_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for kultur_qk_choosen_revModel */
export {
  selectFromkultur_qk_choosen_rev,
  kultur_qk_choosen_revModelPrimitives,
  kultur_qk_choosen_revModelSelector,
} from './kultur_qk_choosen_revModel.base'

/**
 * kultur_qk_choosen_revModel
 */
export const kultur_qk_choosen_revModel = kultur_qk_choosen_revModelBase.actions(
  (self) => ({
    setDeleted() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, deleteKulturQkChoosenRevModel } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
        kultur_qk_choosen_id: self.kultur_qk_choosen_id,
        kultur_id: self.kultur_id,
        qk_name: self.qk_name,
        choosen: self.choosen,
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
        name: 'mutateInsert_kultur_qk_choosen_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'kultur_qk_choosen_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'kultur_qk_choosen',
        revertId: self.kultur_qk_choosen_id,
        revertField: '_deleted',
        revertValue: false,
      })
      deleteKulturQkChoosenRevModel(self)
    },
  }),
)
