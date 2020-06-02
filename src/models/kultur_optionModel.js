import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { kultur_optionModelBase } from './kultur_optionModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for kultur_optionModel */
export {
  selectFromkultur_option,
  kultur_optionModelPrimitives,
  kultur_optionModelSelector,
} from './kultur_optionModel.base'

/**
 * kultur_optionModel
 *
 * columns and relationships of "kultur_option"
 */
export const kultur_optionModel = kultur_optionModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertKulturOptionModel } = store

    //console.log('store, kultur_optionModel:', { self, field, value })

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      kultur_id: self.id,
      z_bemerkungen: field === 'z_bemerkungen' ? value : self.z_bemerkungen,
      tz_teilkultur_id:
        field === 'tz_teilkultur_id' ? value : self.tz_teilkultur_id,
      tz_anzahl_mutterpflanzen:
        field === 'tz_anzahl_mutterpflanzen'
          ? value
          : self.tz_anzahl_mutterpflanzen,
      tz_andere_menge:
        field === 'tz_andere_menge' ? value : self.tz_andere_menge,
      tz_auspflanzbereit_beschreibung:
        field === 'tz_auspflanzbereit_beschreibung'
          ? value
          : self.tz_auspflanzbereit_beschreibung,
      tz_bemerkungen: field === 'tz_bemerkungen' ? value : self.tz_bemerkungen,
      tk: field === 'tk' ? value : self.tk,
      tk_bemerkungen: field === 'tk_bemerkungen' ? value : self.tk_bemerkungen,
      ev_teilkultur_id:
        field === 'ev_teilkultur_id' ? value : self.ev_teilkultur_id,
      ev_geplant: field === 'ev_geplant' ? value : self.ev_geplant,
      ev_person_id: field === 'ev_person_id' ? value : self.ev_person_id,
      ev_datum: field === 'ev_datum' ? value : self.ev_datum,
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
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    newObjectForStore._conflicts = self._conflicts
    // for store: convert herkuft_rev to kultur_option
    newObjectForStore.id = self.id
    delete newObjectForStore.kultur_id
    // optimistically update store
    upsertKulturOptionModel(newObjectForStore)
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
