/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_aggregate_fieldsModel } from "./lieferung_aggregate_fieldsModel"
import { lieferung_aggregate_fieldsModelSelector } from "./lieferung_aggregate_fieldsModel.base"


/**
 * lieferung_aggregateBase
 * auto generated base class for the model lieferung_aggregateModel.
 */
export const lieferung_aggregateModelBase = ModelBase
  .named('lieferung_aggregate')
  .props({
    __typename: types.optional(types.literal("lieferung_aggregate"), "lieferung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => lieferung_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, lieferung_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, lieferungModelSelector, builder) }
}
export function selectFromlieferung_aggregate() {
  return new lieferung_aggregateModelSelector()
}

export const lieferung_aggregateModelPrimitives = selectFromlieferung_aggregate()
