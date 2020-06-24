/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_sum_fieldsBase
 * auto generated base class for the model sammlung_sum_fieldsModel.
 */
export const sammlung_sum_fieldsModelBase = ModelBase
  .named('sammlung_sum_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_sum_fields"), "sammlung_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromsammlung_sum_fields() {
  return new sammlung_sum_fieldsModelSelector()
}

export const sammlung_sum_fieldsModelPrimitives = selectFromsammlung_sum_fields()._depth.anzahl_pflanzen.gramm_samen.lv95_x.lv95_y.von_anzahl_individuen.wgs84_lat.wgs84_long
