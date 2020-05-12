/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_file_max_fieldsModel } from "./kultur_file_max_fieldsModel"
import { kultur_file_max_fieldsModelSelector } from "./kultur_file_max_fieldsModel.base"
import { kultur_file_min_fieldsModel } from "./kultur_file_min_fieldsModel"
import { kultur_file_min_fieldsModelSelector } from "./kultur_file_min_fieldsModel.base"


/**
 * kultur_file_aggregate_fieldsBase
 * auto generated base class for the model kultur_file_aggregate_fieldsModel.
 */
export const kultur_file_aggregate_fieldsModelBase = ModelBase
  .named('kultur_file_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("kultur_file_aggregate_fields"), "kultur_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => kultur_file_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => kultur_file_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_file_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, kultur_file_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, kultur_file_min_fieldsModelSelector, builder) }
}
export function selectFromkultur_file_aggregate_fields() {
  return new kultur_file_aggregate_fieldsModelSelector()
}

export const kultur_file_aggregate_fieldsModelPrimitives = selectFromkultur_file_aggregate_fields().count
