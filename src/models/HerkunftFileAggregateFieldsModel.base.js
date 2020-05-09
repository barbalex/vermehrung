/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftFileMaxFieldsModel } from "./HerkunftFileMaxFieldsModel"
import { HerkunftFileMaxFieldsModelSelector } from "./HerkunftFileMaxFieldsModel.base"
import { HerkunftFileMinFieldsModel } from "./HerkunftFileMinFieldsModel"
import { HerkunftFileMinFieldsModelSelector } from "./HerkunftFileMinFieldsModel.base"


/**
 * HerkunftFileAggregateFieldsBase
 * auto generated base class for the model HerkunftFileAggregateFieldsModel.
 *
 * aggregate fields of "herkunft_file"
 */
export const HerkunftFileAggregateFieldsModelBase = ModelBase
  .named('HerkunftFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("herkunft_file_aggregate_fields"), "herkunft_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => HerkunftFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => HerkunftFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, HerkunftFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, HerkunftFileMinFieldsModelSelector, builder) }
}
export function selectFromHerkunftFileAggregateFields() {
  return new HerkunftFileAggregateFieldsModelSelector()
}

export const herkunftFileAggregateFieldsModelPrimitives = selectFromHerkunftFileAggregateFields().count
