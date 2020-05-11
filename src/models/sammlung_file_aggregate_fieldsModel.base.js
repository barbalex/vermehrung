/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlung_file_max_fieldsModel } from "./sammlung_file_max_fieldsModel"
import { sammlung_file_max_fieldsModelSelector } from "./sammlung_file_max_fieldsModel.base"
import { sammlung_file_min_fieldsModel } from "./sammlung_file_min_fieldsModel"
import { sammlung_file_min_fieldsModelSelector } from "./sammlung_file_min_fieldsModel.base"


/**
 * sammlung_file_aggregate_fieldsBase
 * auto generated base class for the model sammlung_file_aggregate_fieldsModel.
 *
 * aggregate fields of "sammlung_file"
 */
export const sammlung_file_aggregate_fieldsModelBase = ModelBase
  .named('sammlung_file_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_file_aggregate_fields"), "sammlung_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => sammlung_file_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => sammlung_file_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_file_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, sammlung_file_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, sammlung_file_min_fieldsModelSelector, builder) }
}
export function selectFromsammlung_file_aggregate_fields() {
  return new sammlung_file_aggregate_fieldsModelSelector()
}

export const sammlung_file_aggregate_fieldsModelPrimitives = selectFromsammlung_file_aggregate_fields().count
