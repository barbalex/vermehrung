/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_var_samp_fieldsBase
 * auto generated base class for the model sammlung_var_samp_fieldsModel.
 */
export const sammlung_var_samp_fieldsModelBase = ModelBase
  .named('sammlung_var_samp_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_var_samp_fields"), "sammlung_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    lv95_x: types.union(types.undefined, types.null, types.number),
    lv95_y: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
    wgs84_lat: types.union(types.undefined, types.null, types.number),
    wgs84_long: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_var_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
}
export function selectFromsammlung_var_samp_fields() {
  return new sammlung_var_samp_fieldsModelSelector()
}

export const sammlung_var_samp_fieldsModelPrimitives = selectFromsammlung_var_samp_fields()._depth._rev_at.anzahl_pflanzen.gramm_samen.lv95_x.lv95_y.von_anzahl_individuen.wgs84_lat.wgs84_long
