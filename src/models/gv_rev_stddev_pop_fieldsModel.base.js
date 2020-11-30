/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_rev_stddev_pop_fieldsBase
 * auto generated base class for the model gv_rev_stddev_pop_fieldsModel.
 */
export const gv_rev_stddev_pop_fieldsModelBase = ModelBase
  .named('gv_rev_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("gv_rev_stddev_pop_fields"), "gv_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_rev_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromgv_rev_stddev_pop_fields() {
  return new gv_rev_stddev_pop_fieldsModelSelector()
}

export const gv_rev_stddev_pop_fieldsModelPrimitives = selectFromgv_rev_stddev_pop_fields()._depth._rev_at
