/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelSelector } from "./art_qkModel.base"
import { art_qk_aggregate_fieldsModel } from "./art_qk_aggregate_fieldsModel"
import { art_qk_aggregate_fieldsModelSelector } from "./art_qk_aggregate_fieldsModel.base"


/**
 * art_qk_aggregateBase
 * auto generated base class for the model art_qk_aggregateModel.
 */
export const art_qk_aggregateModelBase = ModelBase
  .named('art_qk_aggregate')
  .props({
    __typename: types.optional(types.literal("art_qk_aggregate"), "art_qk_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => art_qk_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qkModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, art_qk_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, art_qkModelSelector, builder) }
}
export function selectFromart_qk_aggregate() {
  return new art_qk_aggregateModelSelector()
}

export const art_qk_aggregateModelPrimitives = selectFromart_qk_aggregate()
