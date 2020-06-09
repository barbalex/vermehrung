import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { herkunft_revModelBase } from './herkunft_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for herkunft_revModel */
export {
  selectFromherkunft_rev,
  herkunft_revModelPrimitives,
  herkunft_revModelSelector,
} from './herkunft_revModel.base'

/**
 * herkunft_revModel
 * columns and relationships of "herkunft_rev"
 */
export const herkunft_revModel = herkunft_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteHerkunftRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      herkunft_id: self.herkunft_id,
      nr: self.nr,
      lokalname: self.lokalname,
      gemeinde: self.gemeinde,
      kanton: self.kanton,
      land: self.land,
      geom_point: self.geom_point,
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
      name: 'mutateInsert_herkunft_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryHerkunft',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'herkunft',
      revertId: self.herkunft_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteHerkunftRevModel(self)
  },
}))
