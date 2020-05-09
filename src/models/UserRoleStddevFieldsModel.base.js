/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleStddevFieldsBase
 * auto generated base class for the model UserRoleStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const UserRoleStddevFieldsModelBase = ModelBase
  .named('UserRoleStddevFields')
  .props({
    __typename: types.optional(types.literal("user_role_stddev_fields"), "user_role_stddev_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleStddevFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleStddevFields() {
  return new UserRoleStddevFieldsModelSelector()
}

export const userRoleStddevFieldsModelPrimitives = selectFromUserRoleStddevFields().sort
