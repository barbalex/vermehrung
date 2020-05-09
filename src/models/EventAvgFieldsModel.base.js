/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventAvgFieldsBase
 * auto generated base class for the model EventAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const EventAvgFieldsModelBase = ModelBase
  .named('EventAvgFields')
  .props({
    __typename: types.optional(types.literal("event_avg_fields"), "event_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventAvgFields() {
  return new EventAvgFieldsModelSelector()
}

export const eventAvgFieldsModelPrimitives = selectFromEventAvgFields()._depth
