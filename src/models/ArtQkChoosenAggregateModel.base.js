/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkChoosenAggregateFieldsModel } from "./ArtQkChoosenAggregateFieldsModel"
import { ArtQkChoosenAggregateFieldsModelSelector } from "./ArtQkChoosenAggregateFieldsModel.base"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"


/**
 * ArtQkChoosenAggregateBase
 * auto generated base class for the model ArtQkChoosenAggregateModel.
 *
 * aggregated selection of "art_qk_choosen"
 */
export const ArtQkChoosenAggregateModelBase = ModelBase
  .named('ArtQkChoosenAggregate')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_aggregate"), "art_qk_choosen_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ArtQkChoosenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkChoosenAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ArtQkChoosenAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ArtQkChoosenModelSelector, builder) }
}
export function selectFromArtQkChoosenAggregate() {
  return new ArtQkChoosenAggregateModelSelector()
}

export const artQkChoosenAggregateModelPrimitives = selectFromArtQkChoosenAggregate()
