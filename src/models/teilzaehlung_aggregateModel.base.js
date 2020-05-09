/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilzaehlungModel } from "./teilzaehlungModel"
import { teilzaehlungModelSelector } from "./teilzaehlungModel.base"
import { teilzaehlung_aggregate_fieldsModel } from "./teilzaehlung_aggregate_fieldsModel"
import { teilzaehlung_aggregate_fieldsModelSelector } from "./teilzaehlung_aggregate_fieldsModel.base"


/**
 * teilzaehlung_aggregateBase
 * auto generated base class for the model teilzaehlung_aggregateModel.
 *
 * aggregated selection of "teilzaehlung"
 */
export const teilzaehlung_aggregateModelBase = ModelBase
  .named('teilzaehlung_aggregate')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_aggregate"), "teilzaehlung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => teilzaehlung_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => teilzaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, teilzaehlung_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, teilzaehlungModelSelector, builder) }
}
export function selectFromteilzaehlung_aggregate() {
  return new teilzaehlung_aggregateModelSelector()
}

export const teilzaehlung_aggregateModelPrimitives = selectFromteilzaehlung_aggregate()
