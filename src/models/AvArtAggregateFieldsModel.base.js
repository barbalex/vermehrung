/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AvArtMaxFieldsModel } from "./AvArtMaxFieldsModel"
import { AvArtMaxFieldsModelSelector } from "./AvArtMaxFieldsModel.base"
import { AvArtMinFieldsModel } from "./AvArtMinFieldsModel"
import { AvArtMinFieldsModelSelector } from "./AvArtMinFieldsModel.base"


/**
 * AvArtAggregateFieldsBase
 * auto generated base class for the model AvArtAggregateFieldsModel.
 *
 * aggregate fields of "av_art"
 */
export const AvArtAggregateFieldsModelBase = ModelBase
  .named('AvArtAggregateFields')
  .props({
    __typename: types.optional(types.literal("av_art_aggregate_fields"), "av_art_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => AvArtMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => AvArtMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AvArtAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, AvArtMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, AvArtMinFieldsModelSelector, builder) }
}
export function selectFromAvArtAggregateFields() {
  return new AvArtAggregateFieldsModelSelector()
}

export const avArtAggregateFieldsModelPrimitives = selectFromAvArtAggregateFields().count
