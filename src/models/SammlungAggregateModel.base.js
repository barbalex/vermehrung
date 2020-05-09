/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungAggregateFieldsModel } from "./SammlungAggregateFieldsModel"
import { SammlungAggregateFieldsModelSelector } from "./SammlungAggregateFieldsModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * SammlungAggregateBase
 * auto generated base class for the model SammlungAggregateModel.
 *
 * aggregated selection of "sammlung"
 */
export const SammlungAggregateModelBase = ModelBase
  .named('SammlungAggregate')
  .props({
    __typename: types.optional(types.literal("sammlung_aggregate"), "sammlung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => SammlungAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, SammlungAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, SammlungModelSelector, builder) }
}
export function selectFromSammlungAggregate() {
  return new SammlungAggregateModelSelector()
}

export const sammlungAggregateModelPrimitives = selectFromSammlungAggregate()
