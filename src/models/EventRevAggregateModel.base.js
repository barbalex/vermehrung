/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventRevAggregateFieldsModel } from "./EventRevAggregateFieldsModel"
import { EventRevAggregateFieldsModelSelector } from "./EventRevAggregateFieldsModel.base"
import { EventRevModel } from "./EventRevModel"
import { EventRevModelSelector } from "./EventRevModel.base"


/**
 * EventRevAggregateBase
 * auto generated base class for the model EventRevAggregateModel.
 *
 * aggregated selection of "event_rev"
 */
export const EventRevAggregateModelBase = ModelBase
  .named('EventRevAggregate')
  .props({
    __typename: types.optional(types.literal("event_rev_aggregate"), "event_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => EventRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => EventRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, EventRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, EventRevModelSelector, builder) }
}
export function selectFromEventRevAggregate() {
  return new EventRevAggregateModelSelector()
}

export const eventRevAggregateModelPrimitives = selectFromEventRevAggregate()
