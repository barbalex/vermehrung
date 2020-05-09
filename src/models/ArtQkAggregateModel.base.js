/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkAggregateFieldsModel } from "./ArtQkAggregateFieldsModel"
import { ArtQkAggregateFieldsModelSelector } from "./ArtQkAggregateFieldsModel.base"
import { ArtQkModel } from "./ArtQkModel"
import { ArtQkModelSelector } from "./ArtQkModel.base"


/**
 * ArtQkAggregateBase
 * auto generated base class for the model ArtQkAggregateModel.
 *
 * aggregated selection of "art_qk"
 */
export const ArtQkAggregateModelBase = ModelBase
  .named('ArtQkAggregate')
  .props({
    __typename: types.optional(types.literal("art_qk_aggregate"), "art_qk_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ArtQkAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ArtQkModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ArtQkAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ArtQkModelSelector, builder) }
}
export function selectFromArtQkAggregate() {
  return new ArtQkAggregateModelSelector()
}

export const artQkAggregateModelPrimitives = selectFromArtQkAggregate()
