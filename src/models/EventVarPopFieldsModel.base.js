/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventVarPopFieldsBase
 * auto generated base class for the model EventVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const EventVarPopFieldsModelBase = ModelBase
  .named('EventVarPopFields')
  .props({
    __typename: types.optional(types.literal("event_var_pop_fields"), "event_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventVarPopFields() {
  return new EventVarPopFieldsModelSelector()
}

export const eventVarPopFieldsModelPrimitives = selectFromEventVarPopFields()._depth
