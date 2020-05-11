/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_aggregate_fieldsModel } from "./sammlung_aggregate_fieldsModel"
import { sammlung_aggregate_fieldsModelSelector } from "./sammlung_aggregate_fieldsModel.base"


/**
 * sammlung_aggregateBase
 * auto generated base class for the model sammlung_aggregateModel.
 *
 * aggregated selection of "sammlung"
 */
export const sammlung_aggregateModelBase = ModelBase
  .named('sammlung_aggregate')
  .props({
    __typename: types.optional(types.literal("sammlung_aggregate"), "sammlung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => sammlung_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, sammlung_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, sammlungModelSelector, builder) }
}
export function selectFromsammlung_aggregate() {
  return new sammlung_aggregateModelSelector()
}

export const sammlung_aggregateModelPrimitives = selectFromsammlung_aggregate()
