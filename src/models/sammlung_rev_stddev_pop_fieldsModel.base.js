/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_rev_stddev_pop_fieldsBase
 * auto generated base class for the model sammlung_rev_stddev_pop_fieldsModel.
 */
export const sammlung_rev_stddev_pop_fieldsModelBase = ModelBase
  .named('sammlung_rev_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_stddev_pop_fields"), "sammlung_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_rev_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromsammlung_rev_stddev_pop_fields() {
  return new sammlung_rev_stddev_pop_fieldsModelSelector()
}

export const sammlung_rev_stddev_pop_fieldsModelPrimitives = selectFromsammlung_rev_stddev_pop_fields()._depth._rev_at.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
