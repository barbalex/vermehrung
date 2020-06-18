import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { av_revModelBase } from './av_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for av_revModel */
export {
  selectFromav_rev,
  av_revModelPrimitives,
  av_revModelSelector,
} from './av_revModel.base'

/**
 * av_revModel
 */
export const av_revModel = av_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteAvRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      av_id: self.av_id,
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
      name: 'mutateInsert_av_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'av_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryAv',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'av',
      revertId: self.av_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteAvRevModel(self)
  },
}))
