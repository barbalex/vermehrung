import { types, getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { herkunftModelBase } from './herkunftModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for herkunftModel */
export {
  selectFromherkunft,
  herkunftModelPrimitives,
  herkunftModelSelector,
} from './herkunftModel.base'

/**
 * herkunftModel
 */
export const herkunftModel = herkunftModelBase
  .props({
    nr: types.union(types.undefined, types.null, types.integer, types.string),
  })
  .actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
    delete() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, tree, deleteHerkunft } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
        herkunft_id: self.id,
        nr: self.nr,
        lokalname: self.lokalname,
        gemeinde: self.gemeinde,
        kanton: self.kanton,
        land: self.land,
        geom_point: self.geom_point,
        bemerkungen: self.bemerkungen,
        changed_by: user.email,
        _parent_rev: self._rev,
        _depth: newDepth,
        _deleted: true,
      }
      const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      newObject.id = uuidv1()
      newObject.changed = new window.Date().toISOString()
      newObject._revisions = self._revisions
        ? toPgArray([rev, ...self._revisions])
        : toPgArray([rev])
      console.log('herkunftModel, newObject:', newObject)

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
      })
      deleteHerkunft({ id: self.id })
      setTimeout(() => {
        tree.refetch()
      }, 50)
    },
  }))
