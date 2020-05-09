/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtSumsAggregateFieldsModel } from "./ArtSumsAggregateFieldsModel"
import { ArtSumsAggregateFieldsModelSelector } from "./ArtSumsAggregateFieldsModel.base"
import { ArtSumsModel } from "./ArtSumsModel"
import { ArtSumsModelSelector } from "./ArtSumsModel.base"


/**
 * ArtSumsAggregateBase
 * auto generated base class for the model ArtSumsAggregateModel.
 *
 * aggregated selection of "art_sums"
 */
export const ArtSumsAggregateModelBase = ModelBase
  .named('ArtSumsAggregate')
  .props({
    __typename: types.optional(types.literal("art_sums_aggregate"), "art_sums_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ArtSumsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ArtSumsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtSumsAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ArtSumsAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ArtSumsModelSelector, builder) }
}
export function selectFromArtSumsAggregate() {
  return new ArtSumsAggregateModelSelector()
}

export const artSumsAggregateModelPrimitives = selectFromArtSumsAggregate()
