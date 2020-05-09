/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventVarianceFieldsBase
 * auto generated base class for the model EventVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const EventVarianceFieldsModelBase = ModelBase
  .named('EventVarianceFields')
  .props({
    __typename: types.optional(types.literal("event_variance_fields"), "event_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventVarianceFields() {
  return new EventVarianceFieldsModelSelector()
}

export const eventVarianceFieldsModelPrimitives = selectFromEventVarianceFields()._depth
