/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_avg_fieldsBase
 * auto generated base class for the model art_avg_fieldsModel.
 */
export const art_avg_fieldsModelBase = ModelBase
  .named('art_avg_fields')
  .props({
    __typename: types.optional(types.literal("art_avg_fields"), "art_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromart_avg_fields() {
  return new art_avg_fieldsModelSelector()
}

export const art_avg_fieldsModelPrimitives = selectFromart_avg_fields()._depth
