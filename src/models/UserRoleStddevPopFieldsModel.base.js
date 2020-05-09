/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleStddevPopFieldsBase
 * auto generated base class for the model UserRoleStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const UserRoleStddevPopFieldsModelBase = ModelBase
  .named('UserRoleStddevPopFields')
  .props({
    __typename: types.optional(types.literal("user_role_stddev_pop_fields"), "user_role_stddev_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleStddevPopFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleStddevPopFields() {
  return new UserRoleStddevPopFieldsModelSelector()
}

export const userRoleStddevPopFieldsModelPrimitives = selectFromUserRoleStddevPopFields().sort
