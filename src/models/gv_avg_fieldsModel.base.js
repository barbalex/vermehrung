/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_avg_fieldsBase
 * auto generated base class for the model gv_avg_fieldsModel.
 */
export const gv_avg_fieldsModelBase = ModelBase
  .named('gv_avg_fields')
  .props({
    __typename: types.optional(types.literal("gv_avg_fields"), "gv_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromgv_avg_fields() {
  return new gv_avg_fieldsModelSelector()
}

export const gv_avg_fieldsModelPrimitives = selectFromgv_avg_fields()._depth
