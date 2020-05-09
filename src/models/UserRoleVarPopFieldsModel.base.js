/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleVarPopFieldsBase
 * auto generated base class for the model UserRoleVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const UserRoleVarPopFieldsModelBase = ModelBase
  .named('UserRoleVarPopFields')
  .props({
    __typename: types.optional(types.literal("user_role_var_pop_fields"), "user_role_var_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleVarPopFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleVarPopFields() {
  return new UserRoleVarPopFieldsModelSelector()
}

export const userRoleVarPopFieldsModelPrimitives = selectFromUserRoleVarPopFields().sort
