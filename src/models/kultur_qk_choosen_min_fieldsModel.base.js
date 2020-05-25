/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_qk_choosen_min_fieldsBase
 * auto generated base class for the model kultur_qk_choosen_min_fieldsModel.
 */
export const kultur_qk_choosen_min_fieldsModelBase = ModelBase
  .named('kultur_qk_choosen_min_fields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_min_fields"), "kultur_qk_choosen_min_fields"),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_min_fieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
}
export function selectFromkultur_qk_choosen_min_fields() {
  return new kultur_qk_choosen_min_fieldsModelSelector()
}

export const kultur_qk_choosen_min_fieldsModelPrimitives = selectFromkultur_qk_choosen_min_fields().kultur_id.qk_name
