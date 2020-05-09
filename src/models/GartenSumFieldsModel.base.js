/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenSumFieldsBase
 * auto generated base class for the model GartenSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const GartenSumFieldsModelBase = ModelBase
  .named('GartenSumFields')
  .props({
    __typename: types.optional(types.literal("garten_sum_fields"), "garten_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get plz() { return this.__attr(`plz`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromGartenSumFields() {
  return new GartenSumFieldsModelSelector()
}

export const gartenSumFieldsModelPrimitives = selectFromGartenSumFields()._depth.lv95_x.lv95_y.plz.wgs84_lat.wgs84_long
