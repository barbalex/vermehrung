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
 * av_artBase
 * auto generated base class for the model av_artModel.
 *
 * columns and relationships of "av_art"
 */
export const av_artModelBase = ModelBase
  .named('av_art')
  .props({
    __typename: types.optional(types.literal("av_art"), "av_art"),
    /** An object relationship */
    art: types.union(types.undefined, types.late(() => artModel)),
    art_id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    art_sums: types.union(types.undefined, types.array(types.late(() => art_sumsModel))),
    /** An aggregated array relationship */
    art_sums_aggregate: types.union(types.undefined, types.late(() => art_sums_aggregateModel)),
    /** An object relationship */
    person: types.union(types.undefined, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_artModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get person_id() { return this.__attr(`person_id`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, art_sumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, art_sums_aggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromav_art() {
  return new av_artModelSelector()
}

export const av_artModelPrimitives = selectFromav_art().art_id.person_id
