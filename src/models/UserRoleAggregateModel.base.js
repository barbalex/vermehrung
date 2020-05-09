/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserRoleAggregateFieldsModel } from "./UserRoleAggregateFieldsModel"
import { UserRoleAggregateFieldsModelSelector } from "./UserRoleAggregateFieldsModel.base"
import { UserRoleModel } from "./UserRoleModel"
import { UserRoleModelSelector } from "./UserRoleModel.base"


/**
 * UserRoleAggregateBase
 * auto generated base class for the model UserRoleAggregateModel.
 *
 * aggregated selection of "user_role"
 */
export const UserRoleAggregateModelBase = ModelBase
  .named('UserRoleAggregate')
  .props({
    __typename: types.optional(types.literal("user_role_aggregate"), "user_role_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => UserRoleAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => UserRoleModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, UserRoleAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, UserRoleModelSelector, builder) }
}
export function selectFromUserRoleAggregate() {
  return new UserRoleAggregateModelSelector()
}

export const userRoleAggregateModelPrimitives = selectFromUserRoleAggregate()
