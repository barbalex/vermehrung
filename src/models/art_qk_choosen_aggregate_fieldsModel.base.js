/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qk_choosen_max_fieldsModel } from "./art_qk_choosen_max_fieldsModel"
import { art_qk_choosen_max_fieldsModelSelector } from "./art_qk_choosen_max_fieldsModel.base"
import { art_qk_choosen_min_fieldsModel } from "./art_qk_choosen_min_fieldsModel"
import { art_qk_choosen_min_fieldsModelSelector } from "./art_qk_choosen_min_fieldsModel.base"


/**
 * art_qk_choosen_aggregate_fieldsBase
 * auto generated base class for the model art_qk_choosen_aggregate_fieldsModel.
 *
 * aggregate fields of "art_qk_choosen"
 */
export const art_qk_choosen_aggregate_fieldsModelBase = ModelBase
  .named('art_qk_choosen_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_aggregate_fields"), "art_qk_choosen_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => art_qk_choosen_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => art_qk_choosen_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, art_qk_choosen_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, art_qk_choosen_min_fieldsModelSelector, builder) }
}
export function selectFromart_qk_choosen_aggregate_fields() {
  return new art_qk_choosen_aggregate_fieldsModelSelector()
}

export const art_qk_choosen_aggregate_fieldsModelPrimitives = selectFromart_qk_choosen_aggregate_fields().count
