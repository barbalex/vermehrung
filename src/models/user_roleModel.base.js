/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"
import { person_aggregateModel } from "./person_aggregateModel"
import { person_aggregateModelSelector } from "./person_aggregateModel.base"
import { person_revModel } from "./person_revModel"
import { person_revModelSelector } from "./person_revModel.base"
import { person_rev_aggregateModel } from "./person_rev_aggregateModel"
import { person_rev_aggregateModelSelector } from "./person_rev_aggregateModel.base"


/**
 * user_roleBase
 * auto generated base class for the model user_roleModel.
 */
export const user_roleModelBase = ModelBase
  .named('user_role')
  .props({
    __typename: types.optional(types.literal("user_role"), "user_role"),
    comment: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    person_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_revModel)))),
    person_revs_aggregate: types.union(types.undefined, types.late(() => person_rev_aggregateModel)),
    persons: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => personModel)))),
    persons_aggregate: types.union(types.undefined, types.late(() => person_aggregateModel)),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class user_roleModelSelector extends QueryBuilder {
  get comment() { return this.__attr(`comment`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  person_revs(builder) { return this.__child(`person_revs`, person_revModelSelector, builder) }
  person_revs_aggregate(builder) { return this.__child(`person_revs_aggregate`, person_rev_aggregateModelSelector, builder) }
  persons(builder) { return this.__child(`persons`, personModelSelector, builder) }
  persons_aggregate(builder) { return this.__child(`persons_aggregate`, person_aggregateModelSelector, builder) }
}
export function selectFromuser_role() {
  return new user_roleModelSelector()
}

export const user_roleModelPrimitives = selectFromuser_role().comment.name.sort
