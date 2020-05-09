/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftStddevSampFieldsBase
 * auto generated base class for the model HerkunftStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const HerkunftStddevSampFieldsModelBase = ModelBase
  .named('HerkunftStddevSampFields')
  .props({
    __typename: types.optional(types.literal("herkunft_stddev_samp_fields"), "herkunft_stddev_samp_fields"),
    lv95_x: types.union(types.undefined, types.null, types.number),
    lv95_y: types.union(types.undefined, types.null, types.number),
    wgs84_lat: types.union(types.undefined, types.null, types.number),
    wgs84_long: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftStddevSampFieldsModelSelector extends QueryBuilder {
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromHerkunftStddevSampFields() {
  return new HerkunftStddevSampFieldsModelSelector()
}

export const herkunftStddevSampFieldsModelPrimitives = selectFromHerkunftStddevSampFields().lv95_x.lv95_y.wgs84_lat.wgs84_long
