import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { teilkultur_revModelBase } from './teilkultur_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for teilkultur_revModel */
export {
  selectFromteilkultur_rev,
  teilkultur_revModelPrimitives,
  teilkultur_revModelSelector,
} from './teilkultur_revModel.base'

/**
 * teilkultur_revModel
 *
 * columns and relationships of "teilkultur_rev"
 */
export const teilkultur_revModel = teilkultur_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteTeilkulturRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      teilkultur_id: self.teilkultur_id,
      kultur_id: self.kultur_id,
      name: self.name,
      ort1: self.ort1,
      ort2: self.ort2,
      ort3: self.ort3,
      bemerkungen: self.bemerkungen,
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
      name: 'mutateInsert_teilkultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryTeilkultur',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    deleteTeilkulturRevModel({ id: self.id })
  },
}))
