/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_stddev_pop_fieldsBase
 * auto generated base class for the model art_stddev_pop_fieldsModel.
 */
export const art_stddev_pop_fieldsModelBase = ModelBase
  .named('art_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("art_stddev_pop_fields"), "art_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromart_stddev_pop_fields() {
  return new art_stddev_pop_fieldsModelSelector()
}

export const art_stddev_pop_fieldsModelPrimitives = selectFromart_stddev_pop_fields()._depth
