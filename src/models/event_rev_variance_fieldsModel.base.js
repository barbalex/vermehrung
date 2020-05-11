/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_rev_variance_fieldsBase
 * auto generated base class for the model event_rev_variance_fieldsModel.
 *
 * aggregate variance on columns
 */
export const event_rev_variance_fieldsModelBase = ModelBase
  .named('event_rev_variance_fields')
  .props({
    __typename: types.optional(types.literal("event_rev_variance_fields"), "event_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromevent_rev_variance_fields() {
  return new event_rev_variance_fieldsModelSelector()
}

export const event_rev_variance_fieldsModelPrimitives = selectFromevent_rev_variance_fields()._depth
