/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevSumFieldsBase
 * auto generated base class for the model EventRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const EventRevSumFieldsModelBase = ModelBase
  .named('EventRevSumFields')
  .props({
    __typename: types.optional(types.literal("event_rev_sum_fields"), "event_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevSumFields() {
  return new EventRevSumFieldsModelSelector()
}

export const eventRevSumFieldsModelPrimitives = selectFromEventRevSumFields()._depth
