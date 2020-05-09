/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenRevAggregateFieldsModel } from "./GartenRevAggregateFieldsModel"
import { GartenRevAggregateFieldsModelSelector } from "./GartenRevAggregateFieldsModel.base"
import { GartenRevModel } from "./GartenRevModel"
import { GartenRevModelSelector } from "./GartenRevModel.base"


/**
 * GartenRevAggregateBase
 * auto generated base class for the model GartenRevAggregateModel.
 *
 * aggregated selection of "garten_rev"
 */
export const GartenRevAggregateModelBase = ModelBase
  .named('GartenRevAggregate')
  .props({
    __typename: types.optional(types.literal("garten_rev_aggregate"), "garten_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => GartenRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => GartenRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, GartenRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, GartenRevModelSelector, builder) }
}
export function selectFromGartenRevAggregate() {
  return new GartenRevAggregateModelSelector()
}

export const gartenRevAggregateModelPrimitives = selectFromGartenRevAggregate()
