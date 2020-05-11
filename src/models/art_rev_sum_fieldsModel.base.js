/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_rev_sum_fieldsBase
 * auto generated base class for the model art_rev_sum_fieldsModel.
 *
 * aggregate sum on columns
 */
export const art_rev_sum_fieldsModelBase = ModelBase
  .named('art_rev_sum_fields')
  .props({
    __typename: types.optional(types.literal("art_rev_sum_fields"), "art_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_rev_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromart_rev_sum_fields() {
  return new art_rev_sum_fieldsModelSelector()
}

export const art_rev_sum_fieldsModelPrimitives = selectFromart_rev_sum_fields()._depth
