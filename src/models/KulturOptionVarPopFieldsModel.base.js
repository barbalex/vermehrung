/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionVarPopFieldsBase
 * auto generated base class for the model KulturOptionVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const KulturOptionVarPopFieldsModelBase = ModelBase
  .named('KulturOptionVarPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_var_pop_fields"), "kultur_option_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionVarPopFields() {
  return new KulturOptionVarPopFieldsModelSelector()
}

export const kulturOptionVarPopFieldsModelPrimitives = selectFromKulturOptionVarPopFields()._depth
