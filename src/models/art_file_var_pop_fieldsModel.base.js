/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_file_var_pop_fieldsBase
 * auto generated base class for the model art_file_var_pop_fieldsModel.
 */
export const art_file_var_pop_fieldsModelBase = ModelBase
  .named('art_file_var_pop_fields')
  .props({
    __typename: types.optional(types.literal("art_file_var_pop_fields"), "art_file_var_pop_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_file_var_pop_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromart_file_var_pop_fields() {
  return new art_file_var_pop_fieldsModelSelector()
}

export const art_file_var_pop_fieldsModelPrimitives = selectFromart_file_var_pop_fields()._rev_at