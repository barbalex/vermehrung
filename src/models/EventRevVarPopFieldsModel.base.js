/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * EventRevVarPopFieldsBase
 * auto generated base class for the model EventRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const EventRevVarPopFieldsModelBase = ModelBase
  .named('EventRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("event_rev_var_pop_fields"), "event_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromEventRevVarPopFields() {
  return new EventRevVarPopFieldsModelSelector()
}

export const eventRevVarPopFieldsModelPrimitives = selectFromEventRevVarPopFields()._depth
