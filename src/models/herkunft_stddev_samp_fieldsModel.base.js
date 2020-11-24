/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * herkunft_stddev_samp_fieldsBase
 * auto generated base class for the model herkunft_stddev_samp_fieldsModel.
 */
export const herkunft_stddev_samp_fieldsModelBase = ModelBase
  .named('herkunft_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_stddev_samp_fields"), "herkunft_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
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

export class herkunft_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromherkunft_stddev_samp_fields() {
  return new herkunft_stddev_samp_fieldsModelSelector()
}

export const herkunft_stddev_samp_fieldsModelPrimitives = selectFromherkunft_stddev_samp_fields()._depth._rev_at.lv95_x.lv95_y.wgs84_lat.wgs84_long
