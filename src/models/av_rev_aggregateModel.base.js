/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_revModel } from "./av_revModel"
import { av_revModelSelector } from "./av_revModel.base"
import { av_rev_aggregate_fieldsModel } from "./av_rev_aggregate_fieldsModel"
import { av_rev_aggregate_fieldsModelSelector } from "./av_rev_aggregate_fieldsModel.base"


/**
 * av_rev_aggregateBase
 * auto generated base class for the model av_rev_aggregateModel.
 */
export const av_rev_aggregateModelBase = ModelBase
  .named('av_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("av_rev_aggregate"), "av_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => av_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => av_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, av_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, av_revModelSelector, builder) }
}
export function selectFromav_rev_aggregate() {
  return new av_rev_aggregateModelSelector()
}

export const av_rev_aggregateModelPrimitives = selectFromav_rev_aggregate()
