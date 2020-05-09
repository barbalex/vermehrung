/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleAvgFieldsBase
 * auto generated base class for the model UserRoleAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const UserRoleAvgFieldsModelBase = ModelBase
  .named('UserRoleAvgFields')
  .props({
    __typename: types.optional(types.literal("user_role_avg_fields"), "user_role_avg_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleAvgFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleAvgFields() {
  return new UserRoleAvgFieldsModelSelector()
}

export const userRoleAvgFieldsModelPrimitives = selectFromUserRoleAvgFields().sort
