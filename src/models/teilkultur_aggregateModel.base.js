/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"
import { teilkultur_aggregate_fieldsModel } from "./teilkultur_aggregate_fieldsModel"
import { teilkultur_aggregate_fieldsModelSelector } from "./teilkultur_aggregate_fieldsModel.base"


/**
 * teilkultur_aggregateBase
 * auto generated base class for the model teilkultur_aggregateModel.
 *
 * aggregated selection of "teilkultur"
 */
export const teilkultur_aggregateModelBase = ModelBase
  .named('teilkultur_aggregate')
  .props({
    __typename: types.optional(types.literal("teilkultur_aggregate"), "teilkultur_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => teilkultur_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkulturModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, teilkultur_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, teilkulturModelSelector, builder) }
}
export function selectFromteilkultur_aggregate() {
  return new teilkultur_aggregateModelSelector()
}

export const teilkultur_aggregateModelPrimitives = selectFromteilkultur_aggregate()
