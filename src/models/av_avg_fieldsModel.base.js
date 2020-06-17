/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * av_avg_fieldsBase
 * auto generated base class for the model av_avg_fieldsModel.
 */
export const av_avg_fieldsModelBase = ModelBase
  .named('av_avg_fields')
  .props({
    __typename: types.optional(types.literal("av_avg_fields"), "av_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromav_avg_fields() {
  return new av_avg_fieldsModelSelector()
}

export const av_avg_fieldsModelPrimitives = selectFromav_avg_fields()._depth
