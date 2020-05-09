/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventAggregateFieldsModel } from "./EventAggregateFieldsModel"
import { EventAggregateFieldsModelSelector } from "./EventAggregateFieldsModel.base"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"


/**
 * EventAggregateBase
 * auto generated base class for the model EventAggregateModel.
 *
 * aggregated selection of "event"
 */
export const EventAggregateModelBase = ModelBase
  .named('EventAggregate')
  .props({
    __typename: types.optional(types.literal("event_aggregate"), "event_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => EventAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => EventModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, EventAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, EventModelSelector, builder) }
}
export function selectFromEventAggregate() {
  return new EventAggregateModelSelector()
}

export const eventAggregateModelPrimitives = selectFromEventAggregate()
