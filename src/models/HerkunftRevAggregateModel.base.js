/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftRevAggregateFieldsModel } from "./HerkunftRevAggregateFieldsModel"
import { HerkunftRevAggregateFieldsModelSelector } from "./HerkunftRevAggregateFieldsModel.base"
import { HerkunftRevModel } from "./HerkunftRevModel"
import { HerkunftRevModelSelector } from "./HerkunftRevModel.base"


/**
 * HerkunftRevAggregateBase
 * auto generated base class for the model HerkunftRevAggregateModel.
 *
 * aggregated selection of "herkunft_rev"
 */
export const HerkunftRevAggregateModelBase = ModelBase
  .named('HerkunftRevAggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_aggregate"), "herkunft_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => HerkunftRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => HerkunftRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, HerkunftRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, HerkunftRevModelSelector, builder) }
}
export function selectFromHerkunftRevAggregate() {
  return new HerkunftRevAggregateModelSelector()
}

export const herkunftRevAggregateModelPrimitives = selectFromHerkunftRevAggregate()
