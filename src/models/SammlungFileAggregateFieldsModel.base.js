/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungFileMaxFieldsModel } from "./SammlungFileMaxFieldsModel"
import { SammlungFileMaxFieldsModelSelector } from "./SammlungFileMaxFieldsModel.base"
import { SammlungFileMinFieldsModel } from "./SammlungFileMinFieldsModel"
import { SammlungFileMinFieldsModelSelector } from "./SammlungFileMinFieldsModel.base"


/**
 * SammlungFileAggregateFieldsBase
 * auto generated base class for the model SammlungFileAggregateFieldsModel.
 *
 * aggregate fields of "sammlung_file"
 */
export const SammlungFileAggregateFieldsModelBase = ModelBase
  .named('SammlungFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("sammlung_file_aggregate_fields"), "sammlung_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => SammlungFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => SammlungFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, SammlungFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, SammlungFileMinFieldsModelSelector, builder) }
}
export function selectFromSammlungFileAggregateFields() {
  return new SammlungFileAggregateFieldsModelSelector()
}

export const sammlungFileAggregateFieldsModelPrimitives = selectFromSammlungFileAggregateFields().count
