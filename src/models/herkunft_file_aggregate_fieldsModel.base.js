/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_file_max_fieldsModel } from "./herkunft_file_max_fieldsModel"
import { herkunft_file_max_fieldsModelSelector } from "./herkunft_file_max_fieldsModel.base"
import { herkunft_file_min_fieldsModel } from "./herkunft_file_min_fieldsModel"
import { herkunft_file_min_fieldsModelSelector } from "./herkunft_file_min_fieldsModel.base"


/**
 * herkunft_file_aggregate_fieldsBase
 * auto generated base class for the model herkunft_file_aggregate_fieldsModel.
 *
 * aggregate fields of "herkunft_file"
 */
export const herkunft_file_aggregate_fieldsModelBase = ModelBase
  .named('herkunft_file_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_file_aggregate_fields"), "herkunft_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => herkunft_file_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => herkunft_file_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_file_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, herkunft_file_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, herkunft_file_min_fieldsModelSelector, builder) }
}
export function selectFromherkunft_file_aggregate_fields() {
  return new herkunft_file_aggregate_fieldsModelSelector()
}

export const herkunft_file_aggregate_fieldsModelPrimitives = selectFromherkunft_file_aggregate_fields().count
