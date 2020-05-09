/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevVarPopFieldsBase
 * auto generated base class for the model KulturOptionRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const KulturOptionRevVarPopFieldsModelBase = ModelBase
  .named('KulturOptionRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_var_pop_fields"), "kultur_option_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevVarPopFields() {
  return new KulturOptionRevVarPopFieldsModelSelector()
}

export const kulturOptionRevVarPopFieldsModelPrimitives = selectFromKulturOptionRevVarPopFields()._depth
