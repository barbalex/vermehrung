/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilkultur_variance_fieldsBase
 * auto generated base class for the model teilkultur_variance_fieldsModel.
 */
export const teilkultur_variance_fieldsModelBase = ModelBase
  .named('teilkultur_variance_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_variance_fields"), "teilkultur_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromteilkultur_variance_fields() {
  return new teilkultur_variance_fieldsModelSelector()
}

export const teilkultur_variance_fieldsModelPrimitives = selectFromteilkultur_variance_fields()._depth
