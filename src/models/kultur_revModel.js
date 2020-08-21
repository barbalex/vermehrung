import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_revModelBase } from './kultur_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for kultur_revModel */
export {
  selectFromkultur_rev,
  kultur_revModelPrimitives,
  kultur_revModelSelector,
} from './kultur_revModel.base'

/**
 * kultur_revModel
 *
 * columns and relationships of "kultur_rev"
 */
export const kultur_revModel = kultur_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteKulturRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      kultur_id: self.kultur_id,
      art_id: self.art_id,
      herkunft_id: self.herkunft_id,
      garten_id: self.garten_id,
      zwischenlager: self.zwischenlager,
      erhaltungskultur: self.erhaltungskultur,
      von_anzahl_individuen: self.von_anzahl_individuen,
      bemerkungen: self.bemerkungen,
      aktiv: self.aktiv,
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
      name: 'mutateInsert_kultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'kultur',
      revertId: self.kultur_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteKulturRevModel(self)
  },
}))
