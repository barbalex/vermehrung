/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * av_variance_fieldsBase
 * auto generated base class for the model av_variance_fieldsModel.
 */
export const av_variance_fieldsModelBase = ModelBase
  .named('av_variance_fields')
  .props({
    __typename: types.optional(types.literal("av_variance_fields"), "av_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromav_variance_fields() {
  return new av_variance_fieldsModelSelector()
}

export const av_variance_fieldsModelPrimitives = selectFromav_variance_fields()._depth._rev_at
