/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_avg_fieldsBase
 * auto generated base class for the model event_avg_fieldsModel.
 */
export const event_avg_fieldsModelBase = ModelBase
  .named('event_avg_fields')
  .props({
    __typename: types.optional(types.literal("event_avg_fields"), "event_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromevent_avg_fields() {
  return new event_avg_fieldsModelSelector()
}

export const event_avg_fieldsModelPrimitives = selectFromevent_avg_fields()._depth._rev_at
