/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferung_file_max_fieldsModel } from "./lieferung_file_max_fieldsModel"
import { lieferung_file_max_fieldsModelSelector } from "./lieferung_file_max_fieldsModel.base"
import { lieferung_file_min_fieldsModel } from "./lieferung_file_min_fieldsModel"
import { lieferung_file_min_fieldsModelSelector } from "./lieferung_file_min_fieldsModel.base"


/**
 * lieferung_file_aggregate_fieldsBase
 * auto generated base class for the model lieferung_file_aggregate_fieldsModel.
 *
 * aggregate fields of "lieferung_file"
 */
export const lieferung_file_aggregate_fieldsModelBase = ModelBase
  .named('lieferung_file_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("lieferung_file_aggregate_fields"), "lieferung_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => lieferung_file_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => lieferung_file_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_file_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, lieferung_file_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, lieferung_file_min_fieldsModelSelector, builder) }
}
export function selectFromlieferung_file_aggregate_fields() {
  return new lieferung_file_aggregate_fieldsModelSelector()
}

export const lieferung_file_aggregate_fieldsModelPrimitives = selectFromlieferung_file_aggregate_fields().count
