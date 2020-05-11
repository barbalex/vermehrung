/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_revModel } from "./herkunft_revModel"
import { herkunft_revModelSelector } from "./herkunft_revModel.base"
import { herkunft_rev_aggregate_fieldsModel } from "./herkunft_rev_aggregate_fieldsModel"
import { herkunft_rev_aggregate_fieldsModelSelector } from "./herkunft_rev_aggregate_fieldsModel.base"


/**
 * herkunft_rev_aggregateBase
 * auto generated base class for the model herkunft_rev_aggregateModel.
 *
 * aggregated selection of "herkunft_rev"
 */
export const herkunft_rev_aggregateModelBase = ModelBase
  .named('herkunft_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_aggregate"), "herkunft_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => herkunft_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunft_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, herkunft_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, herkunft_revModelSelector, builder) }
}
export function selectFromherkunft_rev_aggregate() {
  return new herkunft_rev_aggregateModelSelector()
}

export const herkunft_rev_aggregateModelPrimitives = selectFromherkunft_rev_aggregate()
