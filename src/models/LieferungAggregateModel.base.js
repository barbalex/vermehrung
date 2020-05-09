/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungAggregateFieldsModel } from "./LieferungAggregateFieldsModel"
import { LieferungAggregateFieldsModelSelector } from "./LieferungAggregateFieldsModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"


/**
 * LieferungAggregateBase
 * auto generated base class for the model LieferungAggregateModel.
 *
 * aggregated selection of "lieferung"
 */
export const LieferungAggregateModelBase = ModelBase
  .named('LieferungAggregate')
  .props({
    __typename: types.optional(types.literal("lieferung_aggregate"), "lieferung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => LieferungAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, LieferungAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, LieferungModelSelector, builder) }
}
export function selectFromLieferungAggregate() {
  return new LieferungAggregateModelSelector()
}

export const lieferungAggregateModelPrimitives = selectFromLieferungAggregate()
