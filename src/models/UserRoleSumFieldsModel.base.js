/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleSumFieldsBase
 * auto generated base class for the model UserRoleSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const UserRoleSumFieldsModelBase = ModelBase
  .named('UserRoleSumFields')
  .props({
    __typename: types.optional(types.literal("user_role_sum_fields"), "user_role_sum_fields"),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleSumFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleSumFields() {
  return new UserRoleSumFieldsModelSelector()
}

export const userRoleSumFieldsModelPrimitives = selectFromUserRoleSumFields().sort
