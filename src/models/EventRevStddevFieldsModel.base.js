/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevStddevFieldsBase
 * auto generated base class for the model EventRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const EventRevStddevFieldsModelBase = ModelBase
  .named('EventRevStddevFields')
  .props({
    __typename: types.optional(types.literal("event_rev_stddev_fields"), "event_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevStddevFields() {
  return new EventRevStddevFieldsModelSelector()
}

export const eventRevStddevFieldsModelPrimitives = selectFromEventRevStddevFields()._depth
