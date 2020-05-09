/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * UserRoleStddevSampFieldsBase
 * auto generated base class for the model UserRoleStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const UserRoleStddevSampFieldsModelBase = ModelBase
  .named('UserRoleStddevSampFields')
  .props({
    __typename: types.optional(types.literal("user_role_stddev_samp_fields"), "user_role_stddev_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleStddevSampFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromUserRoleStddevSampFields() {
  return new UserRoleStddevSampFieldsModelSelector()
}

export const userRoleStddevSampFieldsModelPrimitives = selectFromUserRoleStddevSampFields().sort
