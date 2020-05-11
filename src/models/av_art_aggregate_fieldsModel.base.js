/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_art_max_fieldsModel } from "./av_art_max_fieldsModel"
import { av_art_max_fieldsModelSelector } from "./av_art_max_fieldsModel.base"
import { av_art_min_fieldsModel } from "./av_art_min_fieldsModel"
import { av_art_min_fieldsModelSelector } from "./av_art_min_fieldsModel.base"


/**
 * av_art_aggregate_fieldsBase
 * auto generated base class for the model av_art_aggregate_fieldsModel.
 *
 * aggregate fields of "av_art"
 */
export const av_art_aggregate_fieldsModelBase = ModelBase
  .named('av_art_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("av_art_aggregate_fields"), "av_art_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => av_art_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => av_art_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_art_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, av_art_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, av_art_min_fieldsModelSelector, builder) }
}
export function selectFromav_art_aggregate_fields() {
  return new av_art_aggregate_fieldsModelSelector()
}

export const av_art_aggregate_fieldsModelPrimitives = selectFromav_art_aggregate_fields().count
