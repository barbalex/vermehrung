/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { event_revModel } from "./event_revModel"
import { event_revModelSelector } from "./event_revModel.base"
import { event_rev_aggregate_fieldsModel } from "./event_rev_aggregate_fieldsModel"
import { event_rev_aggregate_fieldsModelSelector } from "./event_rev_aggregate_fieldsModel.base"


/**
 * event_rev_aggregateBase
 * auto generated base class for the model event_rev_aggregateModel.
 *
 * aggregated selection of "event_rev"
 */
export const event_rev_aggregateModelBase = ModelBase
  .named('event_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("event_rev_aggregate"), "event_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => event_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => event_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, event_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, event_revModelSelector, builder) }
}
export function selectFromevent_rev_aggregate() {
  return new event_rev_aggregateModelSelector()
}

export const event_rev_aggregateModelPrimitives = selectFromevent_rev_aggregate()
