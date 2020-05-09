/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AvArtAggregateFieldsModel } from "./AvArtAggregateFieldsModel"
import { AvArtAggregateFieldsModelSelector } from "./AvArtAggregateFieldsModel.base"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"


/**
 * AvArtAggregateBase
 * auto generated base class for the model AvArtAggregateModel.
 *
 * aggregated selection of "av_art"
 */
export const AvArtAggregateModelBase = ModelBase
  .named('AvArtAggregate')
  .props({
    __typename: types.optional(types.literal("av_art_aggregate"), "av_art_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => AvArtAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => AvArtModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AvArtAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, AvArtAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, AvArtModelSelector, builder) }
}
export function selectFromAvArtAggregate() {
  return new AvArtAggregateModelSelector()
}

export const avArtAggregateModelPrimitives = selectFromAvArtAggregate()
