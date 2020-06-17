/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gv_revModel } from "./gv_revModel"
import { gv_revModelSelector } from "./gv_revModel.base"
import { gv_rev_aggregate_fieldsModel } from "./gv_rev_aggregate_fieldsModel"
import { gv_rev_aggregate_fieldsModelSelector } from "./gv_rev_aggregate_fieldsModel.base"


/**
 * gv_rev_aggregateBase
 * auto generated base class for the model gv_rev_aggregateModel.
 */
export const gv_rev_aggregateModelBase = ModelBase
  .named('gv_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("gv_rev_aggregate"), "gv_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => gv_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gv_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, gv_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, gv_revModelSelector, builder) }
}
export function selectFromgv_rev_aggregate() {
  return new gv_rev_aggregateModelSelector()
}

export const gv_rev_aggregateModelPrimitives = selectFromgv_rev_aggregate()
