/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * herkunft_min_fieldsBase
 * auto generated base class for the model herkunft_min_fieldsModel.
 */
export const herkunft_min_fieldsModelBase = ModelBase
  .named('herkunft_min_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_min_fields"), "herkunft_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kanton: types.union(types.undefined, types.null, types.string),
    land: types.union(types.undefined, types.null, types.string),
    lokalname: types.union(types.undefined, types.null, types.string),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    nr: types.union(types.undefined, types.null, types.string),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get gemeinde() { return this.__attr(`gemeinde`) }
  get id() { return this.__attr(`id`) }
  get kanton() { return this.__attr(`kanton`) }
  get land() { return this.__attr(`land`) }
  get lokalname() { return this.__attr(`lokalname`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get nr() { return this.__attr(`nr`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromherkunft_min_fields() {
  return new herkunft_min_fieldsModelSelector()
}

export const herkunft_min_fieldsModelPrimitives = selectFromherkunft_min_fields()._depth._parent_rev._rev.bemerkungen.changed.changed_by.gemeinde.kanton.land.lokalname.lv95_x.lv95_y.nr.wgs84_lat.wgs84_long
