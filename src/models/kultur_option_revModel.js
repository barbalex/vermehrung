import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_option_revModelBase } from './kultur_option_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for kultur_option_revModel */
export {
  selectFromkultur_option_rev,
  kultur_option_revModelPrimitives,
  kultur_option_revModelSelector,
} from './kultur_option_revModel.base'

/**
 * kultur_option_revModel
 *
 * columns and relationships of "kultur_option_rev"
 */
export const kultur_option_revModel = kultur_option_revModelBase.actions(
  (self) => ({
    setDeleted() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, deleteKulturOptionRevModel } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
        kultur_id: self.kultur_id,
        z_bemerkungen: self.z_bemerkungen,
        tz_teilkultur_id: self.tz_teilkultur_id,
        tz_anzahl_mutterpflanzen: self.tz_anzahl_mutterpflanzen,
        tz_andere_menge: self.tz_andere_menge,
        tz_auspflanzbereit_beschreibung: self.tz_auspflanzbereit_beschreibung,
        tz_bemerkungen: self.tz_bemerkungen,
        tk: self.tk,
        tk_bemerkungen: self.tk_bemerkungen,
        ev_teilkultur_id: self.ev_teilkultur_id,
        ev_geplant: self.ev_geplant,
        ev_person_id: self.ev_person_id,
        ev_datum: self.ev_datum,
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
        name: 'mutateInsert_kultur_option_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'kultur_option_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryKultur_option',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: self.id } },
        }),
      })
      deleteKulturOptionRevModel({ id: self.id })
    },
  }),
)
