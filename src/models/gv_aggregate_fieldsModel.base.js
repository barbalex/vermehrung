/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gv_max_fieldsModel } from "./gv_max_fieldsModel"
import { gv_max_fieldsModelSelector } from "./gv_max_fieldsModel.base"
import { gv_min_fieldsModel } from "./gv_min_fieldsModel"
import { gv_min_fieldsModelSelector } from "./gv_min_fieldsModel.base"


/**
 * gv_aggregate_fieldsBase
 * auto generated base class for the model gv_aggregate_fieldsModel.
 */
export const gv_aggregate_fieldsModelBase = ModelBase
  .named('gv_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("gv_aggregate_fields"), "gv_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => gv_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => gv_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, gv_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, gv_min_fieldsModelSelector, builder) }
}
export function selectFromgv_aggregate_fields() {
  return new gv_aggregate_fieldsModelSelector()
}

export const gv_aggregate_fieldsModelPrimitives = selectFromgv_aggregate_fields().count
