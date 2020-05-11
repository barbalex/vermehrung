/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_rev_stddev_samp_fieldsBase
 * auto generated base class for the model sammlung_rev_stddev_samp_fieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const sammlung_rev_stddev_samp_fieldsModelBase = ModelBase
  .named('sammlung_rev_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_stddev_samp_fields"), "sammlung_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_rev_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromsammlung_rev_stddev_samp_fields() {
  return new sammlung_rev_stddev_samp_fieldsModelSelector()
}

export const sammlung_rev_stddev_samp_fieldsModelPrimitives = selectFromsammlung_rev_stddev_samp_fields()._depth.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
