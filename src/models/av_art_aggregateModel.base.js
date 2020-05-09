/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"
import { av_art_aggregate_fieldsModel } from "./av_art_aggregate_fieldsModel"
import { av_art_aggregate_fieldsModelSelector } from "./av_art_aggregate_fieldsModel.base"


/**
 * av_art_aggregateBase
 * auto generated base class for the model av_art_aggregateModel.
 *
 * aggregated selection of "av_art"
 */
export const av_art_aggregateModelBase = ModelBase
  .named('av_art_aggregate')
  .props({
    __typename: types.optional(types.literal("av_art_aggregate"), "av_art_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => av_art_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => av_artModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_art_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, av_art_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, av_artModelSelector, builder) }
}
export function selectFromav_art_aggregate() {
  return new av_art_aggregateModelSelector()
}

export const av_art_aggregateModelPrimitives = selectFromav_art_aggregate()
