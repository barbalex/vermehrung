/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelSelector } from "./lieferung_revModel.base"
import { lieferung_rev_aggregate_fieldsModel } from "./lieferung_rev_aggregate_fieldsModel"
import { lieferung_rev_aggregate_fieldsModelSelector } from "./lieferung_rev_aggregate_fieldsModel.base"


/**
 * lieferung_rev_aggregateBase
 * auto generated base class for the model lieferung_rev_aggregateModel.
 *
 * aggregated selection of "lieferung_rev"
 */
export const lieferung_rev_aggregateModelBase = ModelBase
  .named('lieferung_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("lieferung_rev_aggregate"), "lieferung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => lieferung_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, lieferung_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, lieferung_revModelSelector, builder) }
}
export function selectFromlieferung_rev_aggregate() {
  return new lieferung_rev_aggregateModelSelector()
}

export const lieferung_rev_aggregateModelPrimitives = selectFromlieferung_rev_aggregate()
