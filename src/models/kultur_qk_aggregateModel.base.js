/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_qkModel } from "./kultur_qkModel"
import { kultur_qkModelSelector } from "./kultur_qkModel.base"
import { kultur_qk_aggregate_fieldsModel } from "./kultur_qk_aggregate_fieldsModel"
import { kultur_qk_aggregate_fieldsModelSelector } from "./kultur_qk_aggregate_fieldsModel.base"


/**
 * kultur_qk_aggregateBase
 * auto generated base class for the model kultur_qk_aggregateModel.
 *
 * aggregated selection of "kultur_qk"
 */
export const kultur_qk_aggregateModelBase = ModelBase
  .named('kultur_qk_aggregate')
  .props({
    __typename: types.optional(types.literal("kultur_qk_aggregate"), "kultur_qk_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => kultur_qk_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qkModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, kultur_qk_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, kultur_qkModelSelector, builder) }
}
export function selectFromkultur_qk_aggregate() {
  return new kultur_qk_aggregateModelSelector()
}

export const kultur_qk_aggregateModelPrimitives = selectFromkultur_qk_aggregate()
