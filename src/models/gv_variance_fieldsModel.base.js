/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_variance_fieldsBase
 * auto generated base class for the model gv_variance_fieldsModel.
 */
export const gv_variance_fieldsModelBase = ModelBase
  .named('gv_variance_fields')
  .props({
    __typename: types.optional(types.literal("gv_variance_fields"), "gv_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromgv_variance_fields() {
  return new gv_variance_fieldsModelSelector()
}

export const gv_variance_fieldsModelPrimitives = selectFromgv_variance_fields()._depth
