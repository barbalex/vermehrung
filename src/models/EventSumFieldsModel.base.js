/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventSumFieldsBase
 * auto generated base class for the model EventSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const EventSumFieldsModelBase = ModelBase
  .named('EventSumFields')
  .props({
    __typename: types.optional(types.literal("event_sum_fields"), "event_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventSumFields() {
  return new EventSumFieldsModelSelector()
}

export const eventSumFieldsModelPrimitives = selectFromEventSumFields()._depth
