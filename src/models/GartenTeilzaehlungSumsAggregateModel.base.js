/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenTeilzaehlungSumsAggregateFieldsModel } from "./GartenTeilzaehlungSumsAggregateFieldsModel"
import { GartenTeilzaehlungSumsAggregateFieldsModelSelector } from "./GartenTeilzaehlungSumsAggregateFieldsModel.base"
import { GartenTeilzaehlungSumsModel } from "./GartenTeilzaehlungSumsModel"
import { GartenTeilzaehlungSumsModelSelector } from "./GartenTeilzaehlungSumsModel.base"


/**
 * GartenTeilzaehlungSumsAggregateBase
 * auto generated base class for the model GartenTeilzaehlungSumsAggregateModel.
 *
 * aggregated selection of "garten_teilzaehlung_sums"
 */
export const GartenTeilzaehlungSumsAggregateModelBase = ModelBase
  .named('GartenTeilzaehlungSumsAggregate')
  .props({
    __typename: types.optional(types.literal("garten_teilzaehlung_sums_aggregate"), "garten_teilzaehlung_sums_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => GartenTeilzaehlungSumsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => GartenTeilzaehlungSumsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenTeilzaehlungSumsAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, GartenTeilzaehlungSumsAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, GartenTeilzaehlungSumsModelSelector, builder) }
}
export function selectFromGartenTeilzaehlungSumsAggregate() {
  return new GartenTeilzaehlungSumsAggregateModelSelector()
}

export const gartenTeilzaehlungSumsAggregateModelPrimitives = selectFromGartenTeilzaehlungSumsAggregate()
