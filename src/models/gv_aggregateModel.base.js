/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gvModel } from "./gvModel"
import { gvModelSelector } from "./gvModel.base"
import { gv_aggregate_fieldsModel } from "./gv_aggregate_fieldsModel"
import { gv_aggregate_fieldsModelSelector } from "./gv_aggregate_fieldsModel.base"


/**
 * gv_aggregateBase
 * auto generated base class for the model gv_aggregateModel.
 */
export const gv_aggregateModelBase = ModelBase
  .named('gv_aggregate')
  .props({
    __typename: types.optional(types.literal("gv_aggregate"), "gv_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => gv_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gvModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, gv_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, gvModelSelector, builder) }
}
export function selectFromgv_aggregate() {
  return new gv_aggregateModelSelector()
}

export const gv_aggregateModelPrimitives = selectFromgv_aggregate()
