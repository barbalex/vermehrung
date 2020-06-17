/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_sum_fieldsBase
 * auto generated base class for the model gv_sum_fieldsModel.
 */
export const gv_sum_fieldsModelBase = ModelBase
  .named('gv_sum_fields')
  .props({
    __typename: types.optional(types.literal("gv_sum_fields"), "gv_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromgv_sum_fields() {
  return new gv_sum_fieldsModelSelector()
}

export const gv_sum_fieldsModelPrimitives = selectFromgv_sum_fields()._depth
