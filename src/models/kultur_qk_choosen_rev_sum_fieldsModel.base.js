/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_qk_choosen_rev_sum_fieldsBase
 * auto generated base class for the model kultur_qk_choosen_rev_sum_fieldsModel.
 */
export const kultur_qk_choosen_rev_sum_fieldsModelBase = ModelBase
  .named('kultur_qk_choosen_rev_sum_fields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_rev_sum_fields"), "kultur_qk_choosen_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_rev_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromkultur_qk_choosen_rev_sum_fields() {
  return new kultur_qk_choosen_rev_sum_fieldsModelSelector()
}

export const kultur_qk_choosen_rev_sum_fieldsModelPrimitives = selectFromkultur_qk_choosen_rev_sum_fields()._depth._rev_at
