/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserRoleAvgFieldsModel } from "./UserRoleAvgFieldsModel"
import { UserRoleAvgFieldsModelSelector } from "./UserRoleAvgFieldsModel.base"
import { UserRoleMaxFieldsModel } from "./UserRoleMaxFieldsModel"
import { UserRoleMaxFieldsModelSelector } from "./UserRoleMaxFieldsModel.base"
import { UserRoleMinFieldsModel } from "./UserRoleMinFieldsModel"
import { UserRoleMinFieldsModelSelector } from "./UserRoleMinFieldsModel.base"
import { UserRoleStddevFieldsModel } from "./UserRoleStddevFieldsModel"
import { UserRoleStddevFieldsModelSelector } from "./UserRoleStddevFieldsModel.base"
import { UserRoleStddevPopFieldsModel } from "./UserRoleStddevPopFieldsModel"
import { UserRoleStddevPopFieldsModelSelector } from "./UserRoleStddevPopFieldsModel.base"
import { UserRoleStddevSampFieldsModel } from "./UserRoleStddevSampFieldsModel"
import { UserRoleStddevSampFieldsModelSelector } from "./UserRoleStddevSampFieldsModel.base"
import { UserRoleSumFieldsModel } from "./UserRoleSumFieldsModel"
import { UserRoleSumFieldsModelSelector } from "./UserRoleSumFieldsModel.base"
import { UserRoleVarPopFieldsModel } from "./UserRoleVarPopFieldsModel"
import { UserRoleVarPopFieldsModelSelector } from "./UserRoleVarPopFieldsModel.base"
import { UserRoleVarSampFieldsModel } from "./UserRoleVarSampFieldsModel"
import { UserRoleVarSampFieldsModelSelector } from "./UserRoleVarSampFieldsModel.base"
import { UserRoleVarianceFieldsModel } from "./UserRoleVarianceFieldsModel"
import { UserRoleVarianceFieldsModelSelector } from "./UserRoleVarianceFieldsModel.base"


/**
 * UserRoleAggregateFieldsBase
 * auto generated base class for the model UserRoleAggregateFieldsModel.
 *
 * aggregate fields of "user_role"
 */
export const UserRoleAggregateFieldsModelBase = ModelBase
  .named('UserRoleAggregateFields')
  .props({
    __typename: types.optional(types.literal("user_role_aggregate_fields"), "user_role_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => UserRoleAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => UserRoleMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => UserRoleMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => UserRoleStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => UserRoleStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => UserRoleStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => UserRoleSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => UserRoleVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => UserRoleVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => UserRoleVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, UserRoleAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, UserRoleMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, UserRoleMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, UserRoleStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, UserRoleStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, UserRoleStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, UserRoleSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, UserRoleVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, UserRoleVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, UserRoleVarianceFieldsModelSelector, builder) }
}
export function selectFromUserRoleAggregateFields() {
  return new UserRoleAggregateFieldsModelSelector()
}

export const userRoleAggregateFieldsModelPrimitives = selectFromUserRoleAggregateFields().count
