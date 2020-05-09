/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_file_max_fieldsModel } from "./garten_file_max_fieldsModel"
import { garten_file_max_fieldsModelSelector } from "./garten_file_max_fieldsModel.base"
import { garten_file_min_fieldsModel } from "./garten_file_min_fieldsModel"
import { garten_file_min_fieldsModelSelector } from "./garten_file_min_fieldsModel.base"


/**
 * garten_file_aggregate_fieldsBase
 * auto generated base class for the model garten_file_aggregate_fieldsModel.
 *
 * aggregate fields of "garten_file"
 */
export const garten_file_aggregate_fieldsModelBase = ModelBase
  .named('garten_file_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("garten_file_aggregate_fields"), "garten_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => garten_file_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => garten_file_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_file_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, garten_file_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, garten_file_min_fieldsModelSelector, builder) }
}
export function selectFromgarten_file_aggregate_fields() {
  return new garten_file_aggregate_fieldsModelSelector()
}

export const garten_file_aggregate_fieldsModelPrimitives = selectFromgarten_file_aggregate_fields().count
