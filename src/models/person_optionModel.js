import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { person_optionModelBase } from './person_optionModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for person_optionModel */
export {
  selectFromperson_option,
  person_optionModelPrimitives,
  person_optionModelSelector,
} from './person_optionModel.base'

/**
 * person_optionModel
 *
 * columns and relationships of "person_option"
 */
export const person_optionModel = person_optionModelBase.actions((self) => ({
  edit({ field, value }) {
    const store = getParent(self, 2)
    const { addQueuedQuery, user, upsertPersonOptionModel, unsetError } = store

    //console.log('store, person_optionModel:', { self, field, value })

    // first build the part that will be revisioned
    const newDepth = self._depth + 1
    const newObject = {
      person_id: self.id,
      ar_name_deutsch:
        field === 'ar_name_deutsch' ? value : self.ar_name_deutsch,
      ga_strasse: field === 'ga_strasse' ? value : self.ga_strasse,
      ga_plz: field === 'ga_plz' ? value : self.ga_plz,
      ga_ort: field === 'ga_ort' ? value : self.ga_ort,
      ga_geom_point: field === 'ga_geom_point' ? value : self.ga_geom_point,
      ga_lat_lng: field === 'ga_lat_lng' ? value : self.ga_lat_lng,
      ga_aktiv: field === 'ga_aktiv' ? value : self.ga_aktiv,
      ga_bemerkungen: field === 'ga_bemerkungen' ? value : self.ga_bemerkungen,
      hk_kanton: field === 'hk_kanton' ? value : self.hk_kanton,
      hk_land: field === 'hk_land' ? value : self.hk_land,
      hk_bemerkungen: field === 'hk_bemerkungen' ? value : self.hk_bemerkungen,
      hk_geom_point: field === 'hk_geom_point' ? value : self.hk_geom_point,
      li_show_sl_felder:
        field === 'li_show_sl_felder' ? value : self.li_show_sl_felder,
      li_show_sl: field === 'li_show_sl' ? value : self.li_show_sl,
      sl_show_empty_when_next_to_li:
        field === 'sl_show_empty_when_next_to_li'
          ? value
          : self.sl_show_empty_when_next_to_li,
      sl_auto_copy_edits:
        field === 'sl_auto_copy_edits' ? value : self.sl_auto_copy_edits,
      tree_kultur: field === 'tree_kultur' ? value : self.tree_kultur,
      tree_teilkultur:
        field === 'tree_teilkultur' ? value : self.tree_teilkultur,
      tree_zaehlung: field === 'tree_zaehlung' ? value : self.tree_zaehlung,
      tree_lieferung: field === 'tree_lieferung' ? value : self.tree_lieferung,
      tree_event: field === 'tree_event' ? value : self.tree_event,
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
      name: 'mutateInsert_person_option_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'person_option_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryPerson_option',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: self.id } },
      }),
      revertTable: 'person_option',
      revertId: self.id,
      revertField: field,
      revertValue: self[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = self._revisions
      ? [rev, ...self._revisions]
      : [rev]
    newObjectForStore._conflicts = self._conflicts
    // for store: convert herkuft_rev to person_option
    newObjectForStore.id = self.id
    delete newObjectForStore.person_id
    // optimistically update store
    upsertPersonOptionModel(newObjectForStore)
    unsetError({ path: `herkunft.${field}` })
  },
  delete() {
    self.edit({ field: '_deleted', value: true })
  },
}))
