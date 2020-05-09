/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventStddevPopFieldsBase
 * auto generated base class for the model EventStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const EventStddevPopFieldsModelBase = ModelBase
  .named('EventStddevPopFields')
  .props({
    __typename: types.optional(types.literal("event_stddev_pop_fields"), "event_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventStddevPopFields() {
  return new EventStddevPopFieldsModelSelector()
}

export const eventStddevPopFieldsModelPrimitives = selectFromEventStddevPopFields()._depth
