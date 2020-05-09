/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftSumFieldsBase
 * auto generated base class for the model HerkunftSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const HerkunftSumFieldsModelBase = ModelBase
  .named('HerkunftSumFields')
  .props({
    __typename: types.optional(types.literal("herkunft_sum_fields"), "herkunft_sum_fields"),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftSumFieldsModelSelector extends QueryBuilder {
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromHerkunftSumFields() {
  return new HerkunftSumFieldsModelSelector()
}

export const herkunftSumFieldsModelPrimitives = selectFromHerkunftSumFields().lv95_x.lv95_y.wgs84_lat.wgs84_long
