/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_aggregate_fieldsModel } from "./kultur_aggregate_fieldsModel"
import { kultur_aggregate_fieldsModelSelector } from "./kultur_aggregate_fieldsModel.base"


/**
 * kultur_aggregateBase
 * auto generated base class for the model kultur_aggregateModel.
 *
 * aggregated selection of "kultur"
 */
export const kultur_aggregateModelBase = ModelBase
  .named('kultur_aggregate')
  .props({
    __typename: types.optional(types.literal("kultur_aggregate"), "kultur_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => kultur_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, kultur_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, kulturModelSelector, builder) }
}
export function selectFromkultur_aggregate() {
  return new kultur_aggregateModelSelector()
}

export const kultur_aggregateModelPrimitives = selectFromkultur_aggregate()
