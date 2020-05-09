/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevVarPopFieldsBase
 * auto generated base class for the model TeilkulturRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const TeilkulturRevVarPopFieldsModelBase = ModelBase
  .named('TeilkulturRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_var_pop_fields"), "teilkultur_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevVarPopFields() {
  return new TeilkulturRevVarPopFieldsModelSelector()
}

export const teilkulturRevVarPopFieldsModelPrimitives = selectFromTeilkulturRevVarPopFields()._depth
