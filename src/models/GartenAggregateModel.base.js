/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenAggregateFieldsModel } from "./GartenAggregateFieldsModel"
import { GartenAggregateFieldsModelSelector } from "./GartenAggregateFieldsModel.base"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"


/**
 * GartenAggregateBase
 * auto generated base class for the model GartenAggregateModel.
 *
 * aggregated selection of "garten"
 */
export const GartenAggregateModelBase = ModelBase
  .named('GartenAggregate')
  .props({
    __typename: types.optional(types.literal("garten_aggregate"), "garten_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => GartenAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => GartenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, GartenAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, GartenModelSelector, builder) }
}
export function selectFromGartenAggregate() {
  return new GartenAggregateModelSelector()
}

export const gartenAggregateModelPrimitives = selectFromGartenAggregate()
