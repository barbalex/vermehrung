/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_rev_sum_fieldsBase
 * auto generated base class for the model art_qk_rev_sum_fieldsModel.
 */
export const art_qk_rev_sum_fieldsModelBase = ModelBase
  .named('art_qk_rev_sum_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_rev_sum_fields"), "art_qk_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    sort: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_rev_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get sort() { return this.__attr(`sort`) }
}
export function selectFromart_qk_rev_sum_fields() {
  return new art_qk_rev_sum_fieldsModelSelector()
}

export const art_qk_rev_sum_fieldsModelPrimitives = selectFromart_qk_rev_sum_fields()._depth.sort
