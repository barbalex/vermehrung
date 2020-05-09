/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevVarianceFieldsBase
 * auto generated base class for the model EventRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const EventRevVarianceFieldsModelBase = ModelBase
  .named('EventRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("event_rev_variance_fields"), "event_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevVarianceFields() {
  return new EventRevVarianceFieldsModelSelector()
}

export const eventRevVarianceFieldsModelPrimitives = selectFromEventRevVarianceFields()._depth
