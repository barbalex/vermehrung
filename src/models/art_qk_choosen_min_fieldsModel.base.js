/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_choosen_min_fieldsBase
 * auto generated base class for the model art_qk_choosen_min_fieldsModel.
 *
 * aggregate min on columns
 */
export const art_qk_choosen_min_fieldsModelBase = ModelBase
  .named('art_qk_choosen_min_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_min_fields"), "art_qk_choosen_min_fields"),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_min_fieldsModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
}
export function selectFromart_qk_choosen_min_fields() {
  return new art_qk_choosen_min_fieldsModelSelector()
}

export const art_qk_choosen_min_fieldsModelPrimitives = selectFromart_qk_choosen_min_fields().art_id.qk_name
