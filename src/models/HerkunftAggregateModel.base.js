/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftAggregateFieldsModel } from "./HerkunftAggregateFieldsModel"
import { HerkunftAggregateFieldsModelSelector } from "./HerkunftAggregateFieldsModel.base"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"


/**
 * HerkunftAggregateBase
 * auto generated base class for the model HerkunftAggregateModel.
 *
 * aggregated selection of "herkunft"
 */
export const HerkunftAggregateModelBase = ModelBase
  .named('HerkunftAggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_aggregate"), "herkunft_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => HerkunftAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => HerkunftModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, HerkunftAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, HerkunftModelSelector, builder) }
}
export function selectFromHerkunftAggregate() {
  return new HerkunftAggregateModelSelector()
}

export const herkunftAggregateModelPrimitives = selectFromHerkunftAggregate()
