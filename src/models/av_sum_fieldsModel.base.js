/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * av_sum_fieldsBase
 * auto generated base class for the model av_sum_fieldsModel.
 */
export const av_sum_fieldsModelBase = ModelBase
  .named('av_sum_fields')
  .props({
    __typename: types.optional(types.literal("av_sum_fields"), "av_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromav_sum_fields() {
  return new av_sum_fieldsModelSelector()
}

export const av_sum_fieldsModelPrimitives = selectFromav_sum_fields()._depth
