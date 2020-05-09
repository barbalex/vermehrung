/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammelLieferungAggregateFieldsModel } from "./SammelLieferungAggregateFieldsModel"
import { SammelLieferungAggregateFieldsModelSelector } from "./SammelLieferungAggregateFieldsModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"


/**
 * SammelLieferungAggregateBase
 * auto generated base class for the model SammelLieferungAggregateModel.
 *
 * aggregated selection of "sammel_lieferung"
 */
export const SammelLieferungAggregateModelBase = ModelBase
  .named('SammelLieferungAggregate')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_aggregate"), "sammel_lieferung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => SammelLieferungAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, SammelLieferungAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, SammelLieferungModelSelector, builder) }
}
export function selectFromSammelLieferungAggregate() {
  return new SammelLieferungAggregateModelSelector()
}

export const sammelLieferungAggregateModelPrimitives = selectFromSammelLieferungAggregate()
