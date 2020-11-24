/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilkultur_avg_fieldsBase
 * auto generated base class for the model teilkultur_avg_fieldsModel.
 */
export const teilkultur_avg_fieldsModelBase = ModelBase
  .named('teilkultur_avg_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_avg_fields"), "teilkultur_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromteilkultur_avg_fields() {
  return new teilkultur_avg_fieldsModelSelector()
}

export const teilkultur_avg_fieldsModelPrimitives = selectFromteilkultur_avg_fields()._depth._rev_at
