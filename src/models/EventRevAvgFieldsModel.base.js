/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevAvgFieldsBase
 * auto generated base class for the model EventRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const EventRevAvgFieldsModelBase = ModelBase
  .named('EventRevAvgFields')
  .props({
    __typename: types.optional(types.literal("event_rev_avg_fields"), "event_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevAvgFields() {
  return new EventRevAvgFieldsModelSelector()
}

export const eventRevAvgFieldsModelPrimitives = selectFromEventRevAvgFields()._depth
