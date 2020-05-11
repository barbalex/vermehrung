/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { garten_aggregate_fieldsModel } from "./garten_aggregate_fieldsModel"
import { garten_aggregate_fieldsModelSelector } from "./garten_aggregate_fieldsModel.base"


/**
 * garten_aggregateBase
 * auto generated base class for the model garten_aggregateModel.
 *
 * aggregated selection of "garten"
 */
export const garten_aggregateModelBase = ModelBase
  .named('garten_aggregate')
  .props({
    __typename: types.optional(types.literal("garten_aggregate"), "garten_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => garten_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gartenModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, garten_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, gartenModelSelector, builder) }
}
export function selectFromgarten_aggregate() {
  return new garten_aggregateModelSelector()
}

export const garten_aggregateModelPrimitives = selectFromgarten_aggregate()
