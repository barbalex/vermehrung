/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_teilzaehlung_sumsModel } from "./garten_teilzaehlung_sumsModel"
import { garten_teilzaehlung_sumsModelSelector } from "./garten_teilzaehlung_sumsModel.base"
import { garten_teilzaehlung_sums_aggregate_fieldsModel } from "./garten_teilzaehlung_sums_aggregate_fieldsModel"
import { garten_teilzaehlung_sums_aggregate_fieldsModelSelector } from "./garten_teilzaehlung_sums_aggregate_fieldsModel.base"


/**
 * garten_teilzaehlung_sums_aggregateBase
 * auto generated base class for the model garten_teilzaehlung_sums_aggregateModel.
 */
export const garten_teilzaehlung_sums_aggregateModelBase = ModelBase
  .named('garten_teilzaehlung_sums_aggregate')
  .props({
    __typename: types.optional(types.literal("garten_teilzaehlung_sums_aggregate"), "garten_teilzaehlung_sums_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => garten_teilzaehlung_sums_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_teilzaehlung_sumsModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_teilzaehlung_sums_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, garten_teilzaehlung_sums_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, garten_teilzaehlung_sumsModelSelector, builder) }
}
export function selectFromgarten_teilzaehlung_sums_aggregate() {
  return new garten_teilzaehlung_sums_aggregateModelSelector()
}

export const garten_teilzaehlung_sums_aggregateModelPrimitives = selectFromgarten_teilzaehlung_sums_aggregate()
