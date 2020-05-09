/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenAvgFieldsBase
 * auto generated base class for the model GartenAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const GartenAvgFieldsModelBase = ModelBase
  .named('GartenAvgFields')
  .props({
    __typename: types.optional(types.literal("garten_avg_fields"), "garten_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
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

export class GartenAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get plz() { return this.__attr(`plz`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromGartenAvgFields() {
  return new GartenAvgFieldsModelSelector()
}

export const gartenAvgFieldsModelPrimitives = selectFromGartenAvgFields()._depth.lv95_x.lv95_y.plz.wgs84_lat.wgs84_long
