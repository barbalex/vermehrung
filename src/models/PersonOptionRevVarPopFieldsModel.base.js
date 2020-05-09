/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionRevVarPopFieldsBase
 * auto generated base class for the model PersonOptionRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const PersonOptionRevVarPopFieldsModelBase = ModelBase
  .named('PersonOptionRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("person_option_rev_var_pop_fields"), "person_option_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionRevVarPopFields() {
  return new PersonOptionRevVarPopFieldsModelSelector()
}

export const personOptionRevVarPopFieldsModelPrimitives = selectFromPersonOptionRevVarPopFields()._depth
