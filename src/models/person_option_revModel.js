import { getParent } from 'mobx-state-tree'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import { person_option_revModelBase } from './person_option_revModel.base'
import toPgArray from '../utils/toPgArray'

/* A graphql query fragment builders for person_option_revModel */
export {
  selectFromperson_option_rev,
  person_option_revModelPrimitives,
  person_option_revModelSelector,
} from './person_option_revModel.base'

/**
 * person_option_revModel
 *
 * columns and relationships of "person_option_rev"
 */
export const person_option_revModel = person_option_revModelBase.actions(
  (self) => ({
    setDeleted() {
      const store = getParent(self, 2)
      const { addQueuedQuery, user, deletePersonOptionRevModel } = store

      // build new object
      const newDepth = self._depth + 1
      const newObject = {
        person_id: self.person_id,
        ar_name_deutsch: self.ar_name_deutsch,
        ga_strasse: self.ga_strasse,
        ga_plz: self.ga_plz,
        ga_ort: self.ga_ort,
        ga_geom_point: self.ga_geom_point,
        ga_lat_lng: self.ga_lat_lng,
        ga_aktiv: self.ga_aktiv,
        ga_bemerkungen: self.ga_bemerkungen,
        hk_kanton: self.hk_kanton,
        hk_land: self.hk_land,
        hk_bemerkungen: self.hk_bemerkungen,
        hk_geom_point: self.hk_geom_point,
        li_show_sl_felder: self.li_show_sl_felder,
        li_show_sl: self.li_show_sl,
        sl_show_empty_when_next_to_li: self.sl_show_empty_when_next_to_li,
        sl_auto_copy_edits: self.sl_auto_copy_edits,
        tree_kultur: self.tree_kultur,
        tree_teilkultur: self.tree_teilkultur,
        tree_zaehlung: self.tree_zaehlung,
        tree_lieferung: self.tree_lieferung,
        tree_event: self.tree_event,
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
      })
      deletePersonOptionRevModel(self)
    },
  }),
)
