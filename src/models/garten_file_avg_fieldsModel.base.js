/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_file_avg_fieldsBase
 * auto generated base class for the model garten_file_avg_fieldsModel.
 */
export const garten_file_avg_fieldsModelBase = ModelBase
  .named('garten_file_avg_fields')
  .props({
    __typename: types.optional(types.literal("garten_file_avg_fields"), "garten_file_avg_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_file_avg_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromgarten_file_avg_fields() {
  return new garten_file_avg_fieldsModelSelector()
}

export const garten_file_avg_fieldsModelPrimitives = selectFromgarten_file_avg_fields()._rev_at
