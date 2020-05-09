/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionVarPopFieldsBase
 * auto generated base class for the model PersonOptionVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const PersonOptionVarPopFieldsModelBase = ModelBase
  .named('PersonOptionVarPopFields')
  .props({
    __typename: types.optional(types.literal("person_option_var_pop_fields"), "person_option_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionVarPopFields() {
  return new PersonOptionVarPopFieldsModelSelector()
}

export const personOptionVarPopFieldsModelPrimitives = selectFromPersonOptionVarPopFields()._depth
