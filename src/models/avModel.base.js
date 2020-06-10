/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { art_sumsModel } from "./art_sumsModel"
import { art_sumsModelSelector } from "./art_sumsModel.base"
import { art_sums_aggregateModel } from "./art_sums_aggregateModel"
import { art_sums_aggregateModelSelector } from "./art_sums_aggregateModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * avBase
 * auto generated base class for the model avModel.
 */
export const avModelBase = ModelBase
  .named('av')
  .props({
    __typename: types.optional(types.literal("av"), "av"),
    art: types.union(types.undefined, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.frozen()),
    art_sums: types.union(types.undefined, types.array(types.late(() => art_sumsModel))),
    art_sums_aggregate: types.union(types.undefined, types.late(() => art_sums_aggregateModel)),
    id: types.identifier,
    person: types.union(types.undefined, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class avModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, art_sumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, art_sums_aggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromav() {
  return new avModelSelector()
}

export const avModelPrimitives = selectFromav().art_id.person_id
