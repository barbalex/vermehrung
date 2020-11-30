/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_file_sum_fieldsBase
 * auto generated base class for the model kultur_file_sum_fieldsModel.
 */
export const kultur_file_sum_fieldsModelBase = ModelBase
  .named('kultur_file_sum_fields')
  .props({
    __typename: types.optional(types.literal("kultur_file_sum_fields"), "kultur_file_sum_fields"),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_file_sum_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromkultur_file_sum_fields() {
  return new kultur_file_sum_fieldsModelSelector()
}

export const kultur_file_sum_fieldsModelPrimitives = selectFromkultur_file_sum_fields()._rev_at
