/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_rev_stddev_samp_fieldsBase
 * auto generated base class for the model event_rev_stddev_samp_fieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const event_rev_stddev_samp_fieldsModelBase = ModelBase
  .named('event_rev_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("event_rev_stddev_samp_fields"), "event_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromevent_rev_stddev_samp_fields() {
  return new event_rev_stddev_samp_fieldsModelSelector()
}

export const event_rev_stddev_samp_fieldsModelPrimitives = selectFromevent_rev_stddev_samp_fields()._depth
