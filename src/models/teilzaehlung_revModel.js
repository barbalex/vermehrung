import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { teilzaehlung_revModelBase } from './teilzaehlung_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for teilzaehlung_revModel */
export {
  selectFromteilzaehlung_rev,
  teilzaehlung_revModelPrimitives,
  teilzaehlung_revModelSelector,
} from './teilzaehlung_revModel.base'

/**
 * teilzaehlung_revModel
 *
 * columns and relationships of "teilzaehlung_rev"
 */
export const teilzaehlung_revModel = teilzaehlung_revModelBase.actions(
  (self) => ({
    setDeleted() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, deleteTeilzaehlungRevModel } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
        teilzaehlung_id: self.teilzaehlung_id,
        zaehlung_id: self.zaehlung_id,
        teilkultur_id: self.teilkultur_id,
        anzahl_pflanzen: self.anzahl_pflanzen,
        anzahl_auspflanzbereit: self.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen: self.anzahl_mutterpflanzen,
        andere_menge: self.andere_menge,
        auspflanzbereit_beschreibung: self.auspflanzbereit_beschreibung,
        bemerkungen: self.bemerkungen,
        prognose_von_tz: self.prognose_von_tz,
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
        name: 'mutateInsert_teilzaehlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'teilzaehlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryTeilzaehlung',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: self.id } },
        }),
      })
      deleteTeilzaehlungRevModel({ id: self.id })
    },
  }),
)
