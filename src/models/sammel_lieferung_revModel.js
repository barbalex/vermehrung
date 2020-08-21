import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { sammel_lieferung_revModelBase } from './sammel_lieferung_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for sammel_lieferung_revModel */
export {
  selectFromsammel_lieferung_rev,
  sammel_lieferung_revModelPrimitives,
  sammel_lieferung_revModelSelector,
} from './sammel_lieferung_revModel.base'

/**
 * sammel_lieferung_revModel
 *
 * columns and relationships of "sammel_lieferung_rev"
 */
export const sammel_lieferung_revModel = sammel_lieferung_revModelBase.actions(
  (self) => ({
    setDeleted() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, deleteSammelLieferungRevModel } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
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
        name: 'mutateInsert_sammel_lieferung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'sammel_lieferung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'sammel_lieferung',
        revertId: self.sammel_lieferung_id,
        revertField: '_deleted',
        revertValue: false,
      })
      deleteSammelLieferungRevModel(self)
    },
  }),
)
