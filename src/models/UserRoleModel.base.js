/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonAggregateModel } from "./PersonAggregateModel"
import { PersonAggregateModelSelector } from "./PersonAggregateModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { PersonRevAggregateModel } from "./PersonRevAggregateModel"
import { PersonRevAggregateModelSelector } from "./PersonRevAggregateModel.base"
import { PersonRevModel } from "./PersonRevModel"
import { PersonRevModelSelector } from "./PersonRevModel.base"


/**
 * UserRoleBase
 * auto generated base class for the model UserRoleModel.
 *
 * columns and relationships of "user_role"
 */
export const UserRoleModelBase = ModelBase
  .named('UserRole')
  .props({
    __typename: types.optional(types.literal("user_role"), "user_role"),
    comment: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.string),
    /** An array relationship */
    people: types.union(types.undefined, types.array(types.late(() => PersonModel))),
    /** An aggregated array relationship */
    people_aggregate: types.union(types.undefined, types.late(() => PersonAggregateModel)),
    /** An array relationship */
    person_revs: types.union(types.undefined, types.array(types.late(() => PersonRevModel))),
    /** An aggregated array relationship */
    person_revs_aggregate: types.union(types.undefined, types.late(() => PersonRevAggregateModel)),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserRoleModelSelector extends QueryBuilder {
  get comment() { return this.__attr(`comment`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  people(builder) { return this.__child(`people`, PersonModelSelector, builder) }
  people_aggregate(builder) { return this.__child(`people_aggregate`, PersonAggregateModelSelector, builder) }
  person_revs(builder) { return this.__child(`person_revs`, PersonRevModelSelector, builder) }
  person_revs_aggregate(builder) { return this.__child(`person_revs_aggregate`, PersonRevAggregateModelSelector, builder) }
}
export function selectFromUserRole() {
  return new UserRoleModelSelector()
}

export const userRoleModelPrimitives = selectFromUserRole().comment.name.sort
