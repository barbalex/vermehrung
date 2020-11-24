/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_var_pop_fieldsBase
 * auto generated base class for the model art_qk_var_pop_fieldsModel.
 */
export const art_qk_var_pop_fieldsModelBase = ModelBase
  .named('art_qk_var_pop_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_var_pop_fields"), "art_qk_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_var_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get sort() { return this.__attr(`sort`) }
}
export function selectFromart_qk_var_pop_fields() {
  return new art_qk_var_pop_fieldsModelSelector()
}

export const art_qk_var_pop_fieldsModelPrimitives = selectFromart_qk_var_pop_fields()._depth._rev_at.sort
