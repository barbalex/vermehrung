/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_file_max_fieldsModel } from "./person_file_max_fieldsModel"
import { person_file_max_fieldsModelSelector } from "./person_file_max_fieldsModel.base"
import { person_file_min_fieldsModel } from "./person_file_min_fieldsModel"
import { person_file_min_fieldsModelSelector } from "./person_file_min_fieldsModel.base"


/**
 * person_file_aggregate_fieldsBase
 * auto generated base class for the model person_file_aggregate_fieldsModel.
 */
export const person_file_aggregate_fieldsModelBase = ModelBase
  .named('person_file_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("person_file_aggregate_fields"), "person_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => person_file_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => person_file_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_file_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, person_file_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, person_file_min_fieldsModelSelector, builder) }
}
export function selectFromperson_file_aggregate_fields() {
  return new person_file_aggregate_fieldsModelSelector()
}

export const person_file_aggregate_fieldsModelPrimitives = selectFromperson_file_aggregate_fields().count
