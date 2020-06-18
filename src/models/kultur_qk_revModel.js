import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_qk_revModelBase } from './kultur_qk_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for kultur_qk_revModel */
export {
  selectFromkultur_qk_rev,
  kultur_qk_revModelPrimitives,
  kultur_qk_revModelSelector,
} from './kultur_qk_revModel.base'

/**
 * kultur_qk_revModel
 */
export const kultur_qk_revModel = kultur_qk_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteKulturQkRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      kultur_qk_id: self.kultur_qk_id,
      name: self.name,
      titel: self.titel,
      beschreibung: self.beschreibung,
      sort: self.sort,
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
      name: 'mutateInsert_kultur_qk_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_qk_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryKultur_qk',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'kultur_qk',
      revertId: self.kultur_qk_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteKulturQkRevModel(self)
  },
}))
