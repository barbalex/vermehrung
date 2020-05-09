/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelSelector } from "./user_roleModel.base"


/**
 * user_role_mutation_responseBase
 * auto generated base class for the model user_role_mutation_responseModel.
 *
 * response of any mutation on the table "user_role"
 */
export const user_role_mutation_responseModelBase = ModelBase
  .named('user_role_mutation_response')
  .props({
    __typename: types.optional(types.literal("user_role_mutation_response"), "user_role_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => user_roleModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class user_role_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, user_roleModelSelector, builder) }
}
export function selectFromuser_role_mutation_response() {
  return new user_role_mutation_responseModelSelector()
}

export const user_role_mutation_responseModelPrimitives = selectFromuser_role_mutation_response().affected_rows
