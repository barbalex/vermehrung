/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleMaxFieldsBase
 * auto generated base class for the model UserRoleMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const UserRoleMaxFieldsModelBase = ModelBase
  .named('UserRoleMaxFields')
  .props({
    __typename: types.optional(types.literal("user_role_max_fields"), "user_role_max_fields"),
    comment: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleMaxFieldsModelSelector extends QueryBuilder {
  get comment() { return this.__attr(`comment`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleMaxFields() {
  return new UserRoleMaxFieldsModelSelector()
}

export const userRoleMaxFieldsModelPrimitives = selectFromUserRoleMaxFields().comment.name.sort
