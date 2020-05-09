/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_aggregate_fieldsModel } from "./event_aggregate_fieldsModel"
import { event_aggregate_fieldsModelSelector } from "./event_aggregate_fieldsModel.base"


/**
 * event_aggregateBase
 * auto generated base class for the model event_aggregateModel.
 *
 * aggregated selection of "event"
 */
export const event_aggregateModelBase = ModelBase
  .named('event_aggregate')
  .props({
    __typename: types.optional(types.literal("event_aggregate"), "event_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => event_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, event_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, eventModelSelector, builder) }
}
export function selectFromevent_aggregate() {
  return new event_aggregateModelSelector()
}

export const event_aggregateModelPrimitives = selectFromevent_aggregate()
