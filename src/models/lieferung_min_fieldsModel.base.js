/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * lieferung_min_fieldsBase
 * auto generated base class for the model lieferung_min_fieldsModel.
 */
export const lieferung_min_fieldsModelBase = ModelBase
  .named('lieferung_min_fields')
  .props({
    __typename: types.optional(types.literal("lieferung_min_fields"), "lieferung_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    gramm_samen: types.union(types.undefined, types.null, types.integer),
    id: types.identifier,
    nach_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    sammel_lieferung_id: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    von_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    von_sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get id() { return this.__attr(`id`) }
  get nach_kultur_id() { return this.__attr(`nach_kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get sammel_lieferung_id() { return this.__attr(`sammel_lieferung_id`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get von_kultur_id() { return this.__attr(`von_kultur_id`) }
  get von_sammlung_id() { return this.__attr(`von_sammlung_id`) }
}
export function selectFromlieferung_min_fields() {
  return new lieferung_min_fieldsModelSelector()
}

export const lieferung_min_fieldsModelPrimitives = selectFromlieferung_min_fields()._depth._parent_rev._rev.andere_menge.anzahl_auspflanzbereit.anzahl_pflanzen.art_id.bemerkungen.changed.changed_by.datum.gramm_samen.nach_kultur_id.person_id.sammel_lieferung_id.von_anzahl_individuen.von_kultur_id.von_sammlung_id
