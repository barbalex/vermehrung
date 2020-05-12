/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilkultur_sum_fieldsBase
 * auto generated base class for the model teilkultur_sum_fieldsModel.
 */
export const teilkultur_sum_fieldsModelBase = ModelBase
  .named('teilkultur_sum_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_sum_fields"), "teilkultur_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromteilkultur_sum_fields() {
  return new teilkultur_sum_fieldsModelSelector()
}

export const teilkultur_sum_fieldsModelPrimitives = selectFromteilkultur_sum_fields()._depth
