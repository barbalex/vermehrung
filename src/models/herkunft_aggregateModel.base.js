/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"
import { herkunft_aggregate_fieldsModel } from "./herkunft_aggregate_fieldsModel"
import { herkunft_aggregate_fieldsModelSelector } from "./herkunft_aggregate_fieldsModel.base"


/**
 * herkunft_aggregateBase
 * auto generated base class for the model herkunft_aggregateModel.
 *
 * aggregated selection of "herkunft"
 */
export const herkunft_aggregateModelBase = ModelBase
  .named('herkunft_aggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_aggregate"), "herkunft_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => herkunft_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunftModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, herkunft_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, herkunftModelSelector, builder) }
}
export function selectFromherkunft_aggregate() {
  return new herkunft_aggregateModelSelector()
}

export const herkunft_aggregateModelPrimitives = selectFromherkunft_aggregate()
