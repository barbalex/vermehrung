/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtAggregateFieldsModel } from "./ArtAggregateFieldsModel"
import { ArtAggregateFieldsModelSelector } from "./ArtAggregateFieldsModel.base"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"


/**
 * ArtAggregateBase
 * auto generated base class for the model ArtAggregateModel.
 *
 * aggregated selection of "art"
 */
export const ArtAggregateModelBase = ModelBase
  .named('ArtAggregate')
  .props({
    __typename: types.optional(types.literal("art_aggregate"), "art_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ArtAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ArtModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ArtAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ArtModelSelector, builder) }
}
export function selectFromArtAggregate() {
  return new ArtAggregateModelSelector()
}

export const artAggregateModelPrimitives = selectFromArtAggregate()
