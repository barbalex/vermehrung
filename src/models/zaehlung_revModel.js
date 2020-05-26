import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { zaehlung_revModelBase } from './zaehlung_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for zaehlung_revModel */
export {
  selectFromzaehlung_rev,
  zaehlung_revModelPrimitives,
  zaehlung_revModelSelector,
} from './zaehlung_revModel.base'

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
      name: 'mutateInsert_zaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'zaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryZaehlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    deleteZaehlungRevModel({ id: self.id })
  },
}))
