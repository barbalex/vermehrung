/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_choosen_rev_variance_fieldsBase
 * auto generated base class for the model art_qk_choosen_rev_variance_fieldsModel.
 */
export const art_qk_choosen_rev_variance_fieldsModelBase = ModelBase
  .named('art_qk_choosen_rev_variance_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_rev_variance_fields"), "art_qk_choosen_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_rev_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromart_qk_choosen_rev_variance_fields() {
  return new art_qk_choosen_rev_variance_fieldsModelSelector()
}

export const art_qk_choosen_rev_variance_fieldsModelPrimitives = selectFromart_qk_choosen_rev_variance_fields()._depth
