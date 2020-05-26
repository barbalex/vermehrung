import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { garten_revModelBase } from './garten_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for garten_revModel */
export {
  selectFromgarten_rev,
  garten_revModelPrimitives,
  garten_revModelSelector,
} from './garten_revModel.base'

/**
 * garten_revModel
 *
 * columns and relationships of "garten_rev"
 */
export const garten_revModel = garten_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteGartenRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      garten_id: self.garten_id,
      name: self.name,
      person_id: self.person_id,
      strasse: self.strasse,
      plz: self.plz,
      ort: self.ort,
      geom_point: self.geom_point,
      aktiv: self.aktiv,
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
      name: 'mutateInsert_garten_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryGarten',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    deleteGartenRevModel({ id: self.id })
  },
}))
