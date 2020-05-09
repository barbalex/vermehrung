/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturRevAggregateFieldsModel } from "./TeilkulturRevAggregateFieldsModel"
import { TeilkulturRevAggregateFieldsModelSelector } from "./TeilkulturRevAggregateFieldsModel.base"
import { TeilkulturRevModel } from "./TeilkulturRevModel"
import { TeilkulturRevModelSelector } from "./TeilkulturRevModel.base"


/**
 * TeilkulturRevAggregateBase
 * auto generated base class for the model TeilkulturRevAggregateModel.
 *
 * aggregated selection of "teilkultur_rev"
 */
export const TeilkulturRevAggregateModelBase = ModelBase
  .named('TeilkulturRevAggregate')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_aggregate"), "teilkultur_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => TeilkulturRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => TeilkulturRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, TeilkulturRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, TeilkulturRevModelSelector, builder) }
}
export function selectFromTeilkulturRevAggregate() {
  return new TeilkulturRevAggregateModelSelector()
}

export const teilkulturRevAggregateModelPrimitives = selectFromTeilkulturRevAggregate()
