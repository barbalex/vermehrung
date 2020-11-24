/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_stddev_pop_fieldsBase
 * auto generated base class for the model garten_stddev_pop_fieldsModel.
 */
export const garten_stddev_pop_fieldsModelBase = ModelBase
  .named('garten_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("garten_stddev_pop_fields"), "garten_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    lv95_x: types.union(types.undefined, types.null, types.number),
    lv95_y: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
    wgs84_lat: types.union(types.undefined, types.null, types.number),
    wgs84_long: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get plz() { return this.__attr(`plz`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromgarten_stddev_pop_fields() {
  return new garten_stddev_pop_fieldsModelSelector()
}

export const garten_stddev_pop_fieldsModelPrimitives = selectFromgarten_stddev_pop_fields()._depth._rev_at.lv95_x.lv95_y.plz.wgs84_lat.wgs84_long
