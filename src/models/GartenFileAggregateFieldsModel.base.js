/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenFileMaxFieldsModel } from "./GartenFileMaxFieldsModel"
import { GartenFileMaxFieldsModelSelector } from "./GartenFileMaxFieldsModel.base"
import { GartenFileMinFieldsModel } from "./GartenFileMinFieldsModel"
import { GartenFileMinFieldsModelSelector } from "./GartenFileMinFieldsModel.base"


/**
 * GartenFileAggregateFieldsBase
 * auto generated base class for the model GartenFileAggregateFieldsModel.
 *
 * aggregate fields of "garten_file"
 */
export const GartenFileAggregateFieldsModelBase = ModelBase
  .named('GartenFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("garten_file_aggregate_fields"), "garten_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => GartenFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => GartenFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, GartenFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, GartenFileMinFieldsModelSelector, builder) }
}
export function selectFromGartenFileAggregateFields() {
  return new GartenFileAggregateFieldsModelSelector()
}

export const gartenFileAggregateFieldsModelPrimitives = selectFromGartenFileAggregateFields().count
