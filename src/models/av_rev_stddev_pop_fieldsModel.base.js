/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * av_rev_stddev_pop_fieldsBase
 * auto generated base class for the model av_rev_stddev_pop_fieldsModel.
 */
export const av_rev_stddev_pop_fieldsModelBase = ModelBase
  .named('av_rev_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("av_rev_stddev_pop_fields"), "av_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_rev_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromav_rev_stddev_pop_fields() {
  return new av_rev_stddev_pop_fieldsModelSelector()
}

export const av_rev_stddev_pop_fieldsModelPrimitives = selectFromav_rev_stddev_pop_fields()._depth
