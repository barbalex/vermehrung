/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_rev_sum_fieldsBase
 * auto generated base class for the model event_rev_sum_fieldsModel.
 *
 * aggregate sum on columns
 */
export const event_rev_sum_fieldsModelBase = ModelBase
  .named('event_rev_sum_fields')
  .props({
    __typename: types.optional(types.literal("event_rev_sum_fields"), "event_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromevent_rev_sum_fields() {
  return new event_rev_sum_fieldsModelSelector()
}

export const event_rev_sum_fieldsModelPrimitives = selectFromevent_rev_sum_fields()._depth
