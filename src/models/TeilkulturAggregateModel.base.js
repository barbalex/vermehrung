/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturAggregateFieldsModel } from "./TeilkulturAggregateFieldsModel"
import { TeilkulturAggregateFieldsModelSelector } from "./TeilkulturAggregateFieldsModel.base"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"


/**
 * TeilkulturAggregateBase
 * auto generated base class for the model TeilkulturAggregateModel.
 *
 * aggregated selection of "teilkultur"
 */
export const TeilkulturAggregateModelBase = ModelBase
  .named('TeilkulturAggregate')
  .props({
    __typename: types.optional(types.literal("teilkultur_aggregate"), "teilkultur_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => TeilkulturAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => TeilkulturModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, TeilkulturAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, TeilkulturModelSelector, builder) }
}
export function selectFromTeilkulturAggregate() {
  return new TeilkulturAggregateModelSelector()
}

export const teilkulturAggregateModelPrimitives = selectFromTeilkulturAggregate()
