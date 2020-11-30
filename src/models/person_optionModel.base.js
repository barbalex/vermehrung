/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * person_optionBase
 * auto generated base class for the model person_optionModel.
 */
export const person_optionModelBase = ModelBase
  .named('person_option')
  .props({
    __typename: types.optional(types.literal("person_option"), "person_option"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ar_name_deutsch: types.union(types.undefined, types.null, types.boolean),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    ga_aktiv: types.union(types.undefined, types.null, types.boolean),
    ga_bemerkungen: types.union(types.undefined, types.null, types.boolean),
    ga_geom_point: types.union(types.undefined, types.null, types.boolean),
    ga_lat_lng: types.union(types.undefined, types.null, types.boolean),
    ga_ort: types.union(types.undefined, types.null, types.boolean),
    ga_plz: types.union(types.undefined, types.null, types.boolean),
    ga_strasse: types.union(types.undefined, types.null, types.boolean),
    hk_bemerkungen: types.union(types.undefined, types.null, types.boolean),
    hk_geom_point: types.union(types.undefined, types.null, types.boolean),
    hk_kanton: types.union(types.undefined, types.null, types.boolean),
    hk_land: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    ku_erhaltungskultur: types.union(types.undefined, types.null, types.boolean),
    ku_zwischenlager: types.union(types.undefined, types.null, types.boolean),
    li_show_sl: types.union(types.undefined, types.null, types.boolean),
    li_show_sl_felder: types.union(types.undefined, types.null, types.boolean),
    person: types.union(types.undefined, MSTGQLRef(types.late(() => personModel))),
    sl_auto_copy_edits: types.union(types.undefined, types.null, types.boolean),
    sl_show_empty_when_next_to_li: types.union(types.undefined, types.null, types.boolean),
    tree_event: types.union(types.undefined, types.null, types.boolean),
    tree_kultur: types.union(types.undefined, types.null, types.boolean),
    tree_lieferung: types.union(types.undefined, types.null, types.boolean),
    tree_teilkultur: types.union(types.undefined, types.null, types.boolean),
    tree_zaehlung: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_optionModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ar_name_deutsch() { return this.__attr(`ar_name_deutsch`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get ga_aktiv() { return this.__attr(`ga_aktiv`) }
  get ga_bemerkungen() { return this.__attr(`ga_bemerkungen`) }
  get ga_geom_point() { return this.__attr(`ga_geom_point`) }
  get ga_lat_lng() { return this.__attr(`ga_lat_lng`) }
  get ga_ort() { return this.__attr(`ga_ort`) }
  get ga_plz() { return this.__attr(`ga_plz`) }
  get ga_strasse() { return this.__attr(`ga_strasse`) }
  get hk_bemerkungen() { return this.__attr(`hk_bemerkungen`) }
  get hk_geom_point() { return this.__attr(`hk_geom_point`) }
  get hk_kanton() { return this.__attr(`hk_kanton`) }
  get hk_land() { return this.__attr(`hk_land`) }
  get id() { return this.__attr(`id`) }
  get ku_erhaltungskultur() { return this.__attr(`ku_erhaltungskultur`) }
  get ku_zwischenlager() { return this.__attr(`ku_zwischenlager`) }
  get li_show_sl() { return this.__attr(`li_show_sl`) }
  get li_show_sl_felder() { return this.__attr(`li_show_sl_felder`) }
  get sl_auto_copy_edits() { return this.__attr(`sl_auto_copy_edits`) }
  get sl_show_empty_when_next_to_li() { return this.__attr(`sl_show_empty_when_next_to_li`) }
  get tree_event() { return this.__attr(`tree_event`) }
  get tree_kultur() { return this.__attr(`tree_kultur`) }
  get tree_lieferung() { return this.__attr(`tree_lieferung`) }
  get tree_teilkultur() { return this.__attr(`tree_teilkultur`) }
  get tree_zaehlung() { return this.__attr(`tree_zaehlung`) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromperson_option() {
  return new person_optionModelSelector()
}

export const person_optionModelPrimitives = selectFromperson_option()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.ar_name_deutsch.changed.changed_by.ga_aktiv.ga_bemerkungen.ga_geom_point.ga_lat_lng.ga_ort.ga_plz.ga_strasse.hk_bemerkungen.hk_geom_point.hk_kanton.hk_land.ku_erhaltungskultur.ku_zwischenlager.li_show_sl.li_show_sl_felder.sl_auto_copy_edits.sl_show_empty_when_next_to_li.tree_event.tree_kultur.tree_lieferung.tree_teilkultur.tree_zaehlung
