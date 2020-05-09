/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungRevAggregateFieldsModel } from "./SammlungRevAggregateFieldsModel"
import { SammlungRevAggregateFieldsModelSelector } from "./SammlungRevAggregateFieldsModel.base"
import { SammlungRevModel } from "./SammlungRevModel"
import { SammlungRevModelSelector } from "./SammlungRevModel.base"


/**
 * SammlungRevAggregateBase
 * auto generated base class for the model SammlungRevAggregateModel.
 *
 * aggregated selection of "sammlung_rev"
 */
export const SammlungRevAggregateModelBase = ModelBase
  .named('SammlungRevAggregate')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_aggregate"), "sammlung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => SammlungRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => SammlungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, SammlungRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, SammlungRevModelSelector, builder) }
}
export function selectFromSammlungRevAggregate() {
  return new SammlungRevAggregateModelSelector()
}

export const sammlungRevAggregateModelPrimitives = selectFromSammlungRevAggregate()
