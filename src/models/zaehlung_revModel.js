import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { zaehlung_revModelBase } from './Zaehlung_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for zaehlung_revModel */
export {
  selectFromzaehlung_rev,
  zaehlung_revModelPrimitives,
  zaehlung_revModelSelector,
} from './Zaehlung_revModel.base'

/**
 * zaehlung_revModel
 *
 * columns and relationships of "zaehlung_rev"
 */
export const zaehlung_revModel = zaehlung_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteZaehlungRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      zaehlung_id: self.zaehlung_id,
      kultur_id: self.kultur_id,
      datum: self.datum,
      prognose: self.prognose,
      bemerkungen: self.bemerkungen,
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
      name: 'mutateInsert_zaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'zaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'zaehlung',
      revertId: self.zaehlung_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteZaehlungRevModel(self)
  },
}))
