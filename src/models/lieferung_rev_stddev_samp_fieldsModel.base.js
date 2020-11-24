/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * lieferung_rev_stddev_samp_fieldsBase
 * auto generated base class for the model lieferung_rev_stddev_samp_fieldsModel.
 */
export const lieferung_rev_stddev_samp_fieldsModelBase = ModelBase
  .named('lieferung_rev_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("lieferung_rev_stddev_samp_fields"), "lieferung_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_rev_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromlieferung_rev_stddev_samp_fields() {
  return new lieferung_rev_stddev_samp_fieldsModelSelector()
}

export const lieferung_rev_stddev_samp_fieldsModelPrimitives = selectFromlieferung_rev_stddev_samp_fields()._depth._rev_at.anzahl_auspflanzbereit.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
