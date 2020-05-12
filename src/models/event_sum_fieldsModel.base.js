/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_sum_fieldsBase
 * auto generated base class for the model event_sum_fieldsModel.
 */
export const event_sum_fieldsModelBase = ModelBase
  .named('event_sum_fields')
  .props({
    __typename: types.optional(types.literal("event_sum_fields"), "event_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromevent_sum_fields() {
  return new event_sum_fieldsModelSelector()
}

export const event_sum_fieldsModelPrimitives = selectFromevent_sum_fields()._depth
