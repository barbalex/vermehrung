/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftMinFieldsBase
 * auto generated base class for the model HerkunftMinFieldsModel.
 *
 * aggregate min on columns
 */
export const HerkunftMinFieldsModelBase = ModelBase
  .named('HerkunftMinFields')
  .props({
    __typename: types.optional(types.literal("herkunft_min_fields"), "herkunft_min_fields"),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
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

export class HerkunftMinFieldsModelSelector extends QueryBuilder {
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
export function selectFromHerkunftMinFields() {
  return new HerkunftMinFieldsModelSelector()
}

export const herkunftMinFieldsModelPrimitives = selectFromHerkunftMinFields().bemerkungen.changed.changed_by.gemeinde.kanton.land.lokalname.lv95_x.lv95_y.nr.wgs84_lat.wgs84_long
