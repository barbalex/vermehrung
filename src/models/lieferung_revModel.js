import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { lieferung_revModelBase } from './lieferung_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for lieferung_revModel */
export {
  selectFromlieferung_rev,
  lieferung_revModelPrimitives,
  lieferung_revModelSelector,
} from './lieferung_revModel.base'

/**
 * lieferung_revModel
 *
 * columns and relationships of "lieferung_rev"
 */
export const lieferung_revModel = lieferung_revModelBase.actions((self) => ({
  setDeleted() {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, deleteLieferungRevModel } = store

    // build new object
    const newDepth = self._depth + 1
    const newObject = {
      lieferung_id: self.lieferung_id,
      sammel_lieferung_id: self.sammel_lieferung_id,
      art_id: self.art_id,
      person_id: self.person_id,
      von_sammlung_id: self.von_sammlung_id,
      von_kultur_id: self.von_kultur_id,
      datum: self.datum,
      nach_kultur_id: self.nach_kultur_id,
      nach_ausgepflanzt: self.nach_ausgepflanzt,
      von_anzahl_individuen: self.von_anzahl_individuen,
      anzahl_pflanzen: self.anzahl_pflanzen,
      anzahl_auspflanzbereit: self.anzahl_auspflanzbereit,
      gramm_samen: self.gramm_samen,
      andere_menge: self.andere_menge,
      geplant: self.geplant,
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
      name: 'mutateInsert_lieferung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryLieferung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
    })
    deleteLieferungRevModel(self)
  },
}))
