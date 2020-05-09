/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleMinFieldsBase
 * auto generated base class for the model UserRoleMinFieldsModel.
 *
 * aggregate min on columns
 */
export const UserRoleMinFieldsModelBase = ModelBase
  .named('UserRoleMinFields')
  .props({
    __typename: types.optional(types.literal("user_role_min_fields"), "user_role_min_fields"),
    comment: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleMinFieldsModelSelector extends QueryBuilder {
  get comment() { return this.__attr(`comment`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleMinFields() {
  return new UserRoleMinFieldsModelSelector()
}

export const userRoleMinFieldsModelPrimitives = selectFromUserRoleMinFields().comment.name.sort
