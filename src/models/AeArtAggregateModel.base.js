/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AeArtAggregateFieldsModel } from "./AeArtAggregateFieldsModel"
import { AeArtAggregateFieldsModelSelector } from "./AeArtAggregateFieldsModel.base"
import { AeArtModel } from "./AeArtModel"
import { AeArtModelSelector } from "./AeArtModel.base"


/**
 * AeArtAggregateBase
 * auto generated base class for the model AeArtAggregateModel.
 *
 * aggregated selection of "ae_art"
 */
export const AeArtAggregateModelBase = ModelBase
  .named('AeArtAggregate')
  .props({
    __typename: types.optional(types.literal("ae_art_aggregate"), "ae_art_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => AeArtAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => AeArtModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AeArtAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, AeArtAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, AeArtModelSelector, builder) }
}
export function selectFromAeArtAggregate() {
  return new AeArtAggregateModelSelector()
}

export const aeArtAggregateModelPrimitives = selectFromAeArtAggregate()
