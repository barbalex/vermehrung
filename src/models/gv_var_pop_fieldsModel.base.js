/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_var_pop_fieldsBase
 * auto generated base class for the model gv_var_pop_fieldsModel.
 */
export const gv_var_pop_fieldsModelBase = ModelBase
  .named('gv_var_pop_fields')
  .props({
    __typename: types.optional(types.literal("gv_var_pop_fields"), "gv_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_var_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromgv_var_pop_fields() {
  return new gv_var_pop_fieldsModelSelector()
}

export const gv_var_pop_fieldsModelPrimitives = selectFromgv_var_pop_fields()._depth
