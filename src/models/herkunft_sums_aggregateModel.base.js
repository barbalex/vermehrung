/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_sumsModel } from "./herkunft_sumsModel"
import { herkunft_sumsModelSelector } from "./herkunft_sumsModel.base"
import { herkunft_sums_aggregate_fieldsModel } from "./herkunft_sums_aggregate_fieldsModel"
import { herkunft_sums_aggregate_fieldsModelSelector } from "./herkunft_sums_aggregate_fieldsModel.base"


/**
 * herkunft_sums_aggregateBase
 * auto generated base class for the model herkunft_sums_aggregateModel.
 *
 * aggregated selection of "herkunft_sums"
 */
export const herkunft_sums_aggregateModelBase = ModelBase
  .named('herkunft_sums_aggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_sums_aggregate"), "herkunft_sums_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => herkunft_sums_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => herkunft_sumsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_sums_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, herkunft_sums_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, herkunft_sumsModelSelector, builder) }
}
export function selectFromherkunft_sums_aggregate() {
  return new herkunft_sums_aggregateModelSelector()
}

export const herkunft_sums_aggregateModelPrimitives = selectFromherkunft_sums_aggregate()
