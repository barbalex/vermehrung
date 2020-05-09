/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevStddevSampFieldsBase
 * auto generated base class for the model EventRevStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const EventRevStddevSampFieldsModelBase = ModelBase
  .named('EventRevStddevSampFields')
  .props({
    __typename: types.optional(types.literal("event_rev_stddev_samp_fields"), "event_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevStddevSampFields() {
  return new EventRevStddevSampFieldsModelSelector()
}

export const eventRevStddevSampFieldsModelPrimitives = selectFromEventRevStddevSampFields()._depth
