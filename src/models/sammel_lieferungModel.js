import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { sammel_lieferungModelBase } from './sammel_lieferungModel.base'
import toPgArray from '../utils/toPgArray'
import toStringIfPossible from '../utils/toStringIfPossible'
import updateAllLieferungen from '../components/Data/SammelLieferung/Copy/updateAllLieferungen'

/* A graphql query fragment builders for sammel_lieferungModel */
export {
  selectFromsammel_lieferung,
  sammel_lieferungModelPrimitives,
  sammel_lieferungModelSelector,
} from './sammel_lieferungModel.base'

/**
 * sammel_lieferungModel
 *
 * columns and relationships of "sammel_lieferung"
 */
export const sammel_lieferungModel = sammel_lieferungModelBase.actions(
  (self) => ({
    edit({ field, value }) {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, upsertSammelLieferungModel } = store

      // first build the part that will be revisioned
      const newDepth = self._depth + 1
      const newObject = {
        sammel_lieferung_id: self.id,
        art_id: field === 'art_id' ? value : self.art_id,
        person_id: field === 'person_id' ? value : self.person_id,
        von_sammlung_id:
          field === 'von_sammlung_id' ? value : self.von_sammlung_id,
        von_kultur_id: field === 'von_kultur_id' ? value : self.von_kultur_id,
        datum: field === 'datum' ? value : self.datum,
        nach_kultur_id:
          field === 'nach_kultur_id' ? value : self.nach_kultur_id,
        nach_ausgepflanzt:
          field === 'nach_ausgepflanzt' ? value : self.nach_ausgepflanzt,
        von_anzahl_individuen:
          field === 'von_anzahl_individuen'
            ? value
            : self.von_anzahl_individuen,
        anzahl_pflanzen:
          field === 'anzahl_pflanzen' ? value : self.anzahl_pflanzen,
        anzahl_auspflanzbereit:
          field === 'anzahl_auspflanzbereit'
            ? value
            : self.anzahl_auspflanzbereit,
        gramm_samen: field === 'gramm_samen' ? value : self.gramm_samen,
        andere_menge:
          field === 'andere_menge'
            ? toStringIfPossible(value)
            : self.andere_menge,
        geplant: field === 'geplant' ? value : self.geplant,
        bemerkungen:
          field === 'bemerkungen'
            ? toStringIfPossible(value)
            : self.bemerkungen,
        changed: new window.Date().toISOString(),
        changed_by: user.email,
        _parent_rev: self._rev,
        _depth: newDepth,
        _deleted: field === '_deleted' ? value : self._deleted,
      }
      const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
      // DO NOT include id in rev - or revs with same data will conflict
      newObject.id = uuidv1()
      newObject._rev = rev
      const newObjectForStore = { ...newObject }
      // convert to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
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
        callbackQuery: 'querySammel_lieferung',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: self.id } },
        }),
        refetchTree: true,
      })
      // do not stringify revisions for store
      // as _that_ is a real array
      newObjectForStore._revisions = self._revisions
        ? [rev, ...self._revisions]
        : [rev]
      newObjectForStore._conflicts = self._conflicts
      // for store: convert rev to winner
      newObjectForStore.id = self.id
      delete newObjectForStore.sammel_lieferung_id
      // optimistically update store
      upsertSammelLieferungModel(newObjectForStore)
      const userPerson = [...store.persons.values()].find(
        (o) => o.account_id === store.user.uid,
      )
      const { sl_auto_copy_edits } =
        store.person_options.get(userPerson.id) ?? {}
      /*console.log('sammel_lieferungModel', {
        sl_auto_copy_edits,
        selfLieferungs: self.lieferungs,
        newObject,
      })*/
      setTimeout(() => {
        // copy to all lieferungen
        if (sl_auto_copy_edits) {
          // pass field to mark which field should be updated
          // even if it has value null
          updateAllLieferungen({
            sammelLieferung: newObject,
            store,
          })
        }
      }, 50)
    },
    delete() {
      self.edit({ field: '_deleted', value: true })
    },
  }),
)
