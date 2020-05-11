/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { art_aggregate_fieldsModel } from "./art_aggregate_fieldsModel"
import { art_aggregate_fieldsModelSelector } from "./art_aggregate_fieldsModel.base"


/**
 * art_aggregateBase
 * auto generated base class for the model art_aggregateModel.
 *
 * aggregated selection of "art"
 */
export const art_aggregateModelBase = ModelBase
  .named('art_aggregate')
  .props({
    __typename: types.optional(types.literal("art_aggregate"), "art_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => art_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => artModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, art_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, artModelSelector, builder) }
}
export function selectFromart_aggregate() {
  return new art_aggregateModelSelector()
}

export const art_aggregateModelPrimitives = selectFromart_aggregate()
