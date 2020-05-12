/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_variance_fieldsBase
 * auto generated base class for the model art_variance_fieldsModel.
 */
export const art_variance_fieldsModelBase = ModelBase
  .named('art_variance_fields')
  .props({
    __typename: types.optional(types.literal("art_variance_fields"), "art_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromart_variance_fields() {
  return new art_variance_fieldsModelSelector()
}

export const art_variance_fieldsModelPrimitives = selectFromart_variance_fields()._depth
