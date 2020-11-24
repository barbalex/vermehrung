/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilkultur_rev_sum_fieldsBase
 * auto generated base class for the model teilkultur_rev_sum_fieldsModel.
 */
export const teilkultur_rev_sum_fieldsModelBase = ModelBase
  .named('teilkultur_rev_sum_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_sum_fields"), "teilkultur_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_rev_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromteilkultur_rev_sum_fields() {
  return new teilkultur_rev_sum_fieldsModelSelector()
}

export const teilkultur_rev_sum_fieldsModelPrimitives = selectFromteilkultur_rev_sum_fields()._depth._rev_at
