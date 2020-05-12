/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_stddev_fieldsBase
 * auto generated base class for the model event_stddev_fieldsModel.
 */
export const event_stddev_fieldsModelBase = ModelBase
  .named('event_stddev_fields')
  .props({
    __typename: types.optional(types.literal("event_stddev_fields"), "event_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_stddev_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromevent_stddev_fields() {
  return new event_stddev_fieldsModelSelector()
}

export const event_stddev_fieldsModelPrimitives = selectFromevent_stddev_fields()._depth
