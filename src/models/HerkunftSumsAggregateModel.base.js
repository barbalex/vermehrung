/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftSumsAggregateFieldsModel } from "./HerkunftSumsAggregateFieldsModel"
import { HerkunftSumsAggregateFieldsModelSelector } from "./HerkunftSumsAggregateFieldsModel.base"
import { HerkunftSumsModel } from "./HerkunftSumsModel"
import { HerkunftSumsModelSelector } from "./HerkunftSumsModel.base"


/**
 * HerkunftSumsAggregateBase
 * auto generated base class for the model HerkunftSumsAggregateModel.
 *
 * aggregated selection of "herkunft_sums"
 */
export const HerkunftSumsAggregateModelBase = ModelBase
  .named('HerkunftSumsAggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_sums_aggregate"), "herkunft_sums_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => HerkunftSumsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => HerkunftSumsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftSumsAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, HerkunftSumsAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, HerkunftSumsModelSelector, builder) }
}
export function selectFromHerkunftSumsAggregate() {
  return new HerkunftSumsAggregateModelSelector()
}

export const herkunftSumsAggregateModelPrimitives = selectFromHerkunftSumsAggregate()
