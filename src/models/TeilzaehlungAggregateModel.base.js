/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilzaehlungAggregateFieldsModel } from "./TeilzaehlungAggregateFieldsModel"
import { TeilzaehlungAggregateFieldsModelSelector } from "./TeilzaehlungAggregateFieldsModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"


/**
 * TeilzaehlungAggregateBase
 * auto generated base class for the model TeilzaehlungAggregateModel.
 *
 * aggregated selection of "teilzaehlung"
 */
export const TeilzaehlungAggregateModelBase = ModelBase
  .named('TeilzaehlungAggregate')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_aggregate"), "teilzaehlung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => TeilzaehlungAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => TeilzaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, TeilzaehlungAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, TeilzaehlungModelSelector, builder) }
}
export function selectFromTeilzaehlungAggregate() {
  return new TeilzaehlungAggregateModelSelector()
}

export const teilzaehlungAggregateModelPrimitives = selectFromTeilzaehlungAggregate()
