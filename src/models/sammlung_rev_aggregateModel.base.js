/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelSelector } from "./sammlung_revModel.base"
import { sammlung_rev_aggregate_fieldsModel } from "./sammlung_rev_aggregate_fieldsModel"
import { sammlung_rev_aggregate_fieldsModelSelector } from "./sammlung_rev_aggregate_fieldsModel.base"


/**
 * sammlung_rev_aggregateBase
 * auto generated base class for the model sammlung_rev_aggregateModel.
 *
 * aggregated selection of "sammlung_rev"
 */
export const sammlung_rev_aggregateModelBase = ModelBase
  .named('sammlung_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_aggregate"), "sammlung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => sammlung_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => sammlung_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, sammlung_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, sammlung_revModelSelector, builder) }
}
export function selectFromsammlung_rev_aggregate() {
  return new sammlung_rev_aggregateModelSelector()
}

export const sammlung_rev_aggregateModelPrimitives = selectFromsammlung_rev_aggregate()
