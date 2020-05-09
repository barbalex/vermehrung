/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserRoleModel } from "./UserRoleModel"
import { UserRoleModelSelector } from "./UserRoleModel.base"


/**
 * UserRoleMutationResponseBase
 * auto generated base class for the model UserRoleMutationResponseModel.
 *
 * response of any mutation on the table "user_role"
 */
export const UserRoleMutationResponseModelBase = ModelBase
  .named('UserRoleMutationResponse')
  .props({
    __typename: types.optional(types.literal("user_role_mutation_response"), "user_role_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => UserRoleModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, UserRoleModelSelector, builder) }
}
export function selectFromUserRoleMutationResponse() {
  return new UserRoleMutationResponseModelSelector()
}

export const userRoleMutationResponseModelPrimitives = selectFromUserRoleMutationResponse().affected_rows
