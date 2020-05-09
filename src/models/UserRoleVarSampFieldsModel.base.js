/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleVarSampFieldsBase
 * auto generated base class for the model UserRoleVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const UserRoleVarSampFieldsModelBase = ModelBase
  .named('UserRoleVarSampFields')
  .props({
    __typename: types.optional(types.literal("user_role_var_samp_fields"), "user_role_var_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleVarSampFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleVarSampFields() {
  return new UserRoleVarSampFieldsModelSelector()
}

export const userRoleVarSampFieldsModelPrimitives = selectFromUserRoleVarSampFields().sort
