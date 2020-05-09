/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelSelector } from "./kultur_revModel.base"
import { kultur_rev_aggregate_fieldsModel } from "./kultur_rev_aggregate_fieldsModel"
import { kultur_rev_aggregate_fieldsModelSelector } from "./kultur_rev_aggregate_fieldsModel.base"


/**
 * kultur_rev_aggregateBase
 * auto generated base class for the model kultur_rev_aggregateModel.
 *
 * aggregated selection of "kultur_rev"
 */
export const kultur_rev_aggregateModelBase = ModelBase
  .named('kultur_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("kultur_rev_aggregate"), "kultur_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => kultur_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => kultur_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, kultur_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, kultur_revModelSelector, builder) }
}
export function selectFromkultur_rev_aggregate() {
  return new kultur_rev_aggregateModelSelector()
}

export const kultur_rev_aggregateModelPrimitives = selectFromkultur_rev_aggregate()
