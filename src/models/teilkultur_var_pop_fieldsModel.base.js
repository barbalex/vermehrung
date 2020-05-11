/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilkultur_var_pop_fieldsBase
 * auto generated base class for the model teilkultur_var_pop_fieldsModel.
 *
 * aggregate var_pop on columns
 */
export const teilkultur_var_pop_fieldsModelBase = ModelBase
  .named('teilkultur_var_pop_fields')
  .props({
    __typename: types.optional(types.literal("teilkultur_var_pop_fields"), "teilkultur_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_var_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromteilkultur_var_pop_fields() {
  return new teilkultur_var_pop_fieldsModelSelector()
}

export const teilkultur_var_pop_fieldsModelPrimitives = selectFromteilkultur_var_pop_fields()._depth
