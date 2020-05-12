/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelSelector } from "./user_roleModel.base"
import { user_role_aggregate_fieldsModel } from "./user_role_aggregate_fieldsModel"
import { user_role_aggregate_fieldsModelSelector } from "./user_role_aggregate_fieldsModel.base"


/**
 * user_role_aggregateBase
 * auto generated base class for the model user_role_aggregateModel.
 */
export const user_role_aggregateModelBase = ModelBase
  .named('user_role_aggregate')
  .props({
    __typename: types.optional(types.literal("user_role_aggregate"), "user_role_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => user_role_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => user_roleModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class user_role_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, user_role_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, user_roleModelSelector, builder) }
}
export function selectFromuser_role_aggregate() {
  return new user_role_aggregateModelSelector()
}

export const user_role_aggregateModelPrimitives = selectFromuser_role_aggregate()
