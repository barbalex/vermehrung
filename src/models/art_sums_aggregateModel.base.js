/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_sumsModel } from "./art_sumsModel"
import { art_sumsModelSelector } from "./art_sumsModel.base"
import { art_sums_aggregate_fieldsModel } from "./art_sums_aggregate_fieldsModel"
import { art_sums_aggregate_fieldsModelSelector } from "./art_sums_aggregate_fieldsModel.base"


/**
 * art_sums_aggregateBase
 * auto generated base class for the model art_sums_aggregateModel.
 */
export const art_sums_aggregateModelBase = ModelBase
  .named('art_sums_aggregate')
  .props({
    __typename: types.optional(types.literal("art_sums_aggregate"), "art_sums_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => art_sums_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => art_sumsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_sums_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, art_sums_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, art_sumsModelSelector, builder) }
}
export function selectFromart_sums_aggregate() {
  return new art_sums_aggregateModelSelector()
}

export const art_sums_aggregateModelPrimitives = selectFromart_sums_aggregate()
