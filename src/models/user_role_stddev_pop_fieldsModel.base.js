/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * user_role_stddev_pop_fieldsBase
 * auto generated base class for the model user_role_stddev_pop_fieldsModel.
 */
export const user_role_stddev_pop_fieldsModelBase = ModelBase
  .named('user_role_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("user_role_stddev_pop_fields"), "user_role_stddev_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class user_role_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromuser_role_stddev_pop_fields() {
  return new user_role_stddev_pop_fieldsModelSelector()
}

export const user_role_stddev_pop_fieldsModelPrimitives = selectFromuser_role_stddev_pop_fields().sort
