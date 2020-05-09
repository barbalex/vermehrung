/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtFileAggregateFieldsModel } from "./ArtFileAggregateFieldsModel"
import { ArtFileAggregateFieldsModelSelector } from "./ArtFileAggregateFieldsModel.base"
import { ArtFileModel } from "./ArtFileModel"
import { ArtFileModelSelector } from "./ArtFileModel.base"


/**
 * ArtFileAggregateBase
 * auto generated base class for the model ArtFileAggregateModel.
 *
 * aggregated selection of "art_file"
 */
export const ArtFileAggregateModelBase = ModelBase
  .named('ArtFileAggregate')
  .props({
    __typename: types.optional(types.literal("art_file_aggregate"), "art_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ArtFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ArtFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ArtFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ArtFileModelSelector, builder) }
}
export function selectFromArtFileAggregate() {
  return new ArtFileAggregateModelSelector()
}

export const artFileAggregateModelPrimitives = selectFromArtFileAggregate()
