/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleVarianceFieldsBase
 * auto generated base class for the model UserRoleVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const UserRoleVarianceFieldsModelBase = ModelBase
  .named('UserRoleVarianceFields')
  .props({
    __typename: types.optional(types.literal("user_role_variance_fields"), "user_role_variance_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleVarianceFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleVarianceFields() {
  return new UserRoleVarianceFieldsModelSelector()
}

export const userRoleVarianceFieldsModelPrimitives = selectFromUserRoleVarianceFields().sort
