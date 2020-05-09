/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtRevAggregateFieldsModel } from "./ArtRevAggregateFieldsModel"
import { ArtRevAggregateFieldsModelSelector } from "./ArtRevAggregateFieldsModel.base"
import { ArtRevModel } from "./ArtRevModel"
import { ArtRevModelSelector } from "./ArtRevModel.base"


/**
 * ArtRevAggregateBase
 * auto generated base class for the model ArtRevAggregateModel.
 *
 * aggregated selection of "art_rev"
 */
export const ArtRevAggregateModelBase = ModelBase
  .named('ArtRevAggregate')
  .props({
    __typename: types.optional(types.literal("art_rev_aggregate"), "art_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ArtRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ArtRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ArtRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ArtRevModelSelector, builder) }
}
export function selectFromArtRevAggregate() {
  return new ArtRevAggregateModelSelector()
}

export const artRevAggregateModelPrimitives = selectFromArtRevAggregate()
