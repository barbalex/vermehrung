/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevStddevPopFieldsBase
 * auto generated base class for the model EventRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const EventRevStddevPopFieldsModelBase = ModelBase
  .named('EventRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("event_rev_stddev_pop_fields"), "event_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevStddevPopFields() {
  return new EventRevStddevPopFieldsModelSelector()
}

export const eventRevStddevPopFieldsModelPrimitives = selectFromEventRevStddevPopFields()._depth
