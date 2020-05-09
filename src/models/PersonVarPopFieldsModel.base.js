/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonVarPopFieldsBase
 * auto generated base class for the model PersonVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const PersonVarPopFieldsModelBase = ModelBase
  .named('PersonVarPopFields')
  .props({
    __typename: types.optional(types.literal("person_var_pop_fields"), "person_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonVarPopFields() {
  return new PersonVarPopFieldsModelSelector()
}

export const personVarPopFieldsModelPrimitives = selectFromPersonVarPopFields()._depth.plz
