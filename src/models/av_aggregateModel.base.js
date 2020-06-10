/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { avModel } from "./avModel"
import { avModelSelector } from "./avModel.base"
import { av_aggregate_fieldsModel } from "./av_aggregate_fieldsModel"
import { av_aggregate_fieldsModelSelector } from "./av_aggregate_fieldsModel.base"


/**
 * av_aggregateBase
 * auto generated base class for the model av_aggregateModel.
 */
export const av_aggregateModelBase = ModelBase
  .named('av_aggregate')
  .props({
    __typename: types.optional(types.literal("av_aggregate"), "av_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => av_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => avModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, av_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, avModelSelector, builder) }
}
export function selectFromav_aggregate() {
  return new av_aggregateModelSelector()
}

export const av_aggregateModelPrimitives = selectFromav_aggregate()
