/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_revModel } from "./garten_revModel"
import { garten_revModelSelector } from "./garten_revModel.base"
import { garten_rev_aggregate_fieldsModel } from "./garten_rev_aggregate_fieldsModel"
import { garten_rev_aggregate_fieldsModelSelector } from "./garten_rev_aggregate_fieldsModel.base"


/**
 * garten_rev_aggregateBase
 * auto generated base class for the model garten_rev_aggregateModel.
 *
 * aggregated selection of "garten_rev"
 */
export const garten_rev_aggregateModelBase = ModelBase
  .named('garten_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("garten_rev_aggregate"), "garten_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => garten_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, garten_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, garten_revModelSelector, builder) }
}
export function selectFromgarten_rev_aggregate() {
  return new garten_rev_aggregateModelSelector()
}

export const garten_rev_aggregateModelPrimitives = selectFromgarten_rev_aggregate()
