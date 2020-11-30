/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_stddev_fieldsBase
 * auto generated base class for the model gv_stddev_fieldsModel.
 */
export const gv_stddev_fieldsModelBase = ModelBase
  .named('gv_stddev_fields')
  .props({
    __typename: types.optional(types.literal("gv_stddev_fields"), "gv_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_stddev_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromgv_stddev_fields() {
  return new gv_stddev_fieldsModelSelector()
}

export const gv_stddev_fieldsModelPrimitives = selectFromgv_stddev_fields()._depth._rev_at
