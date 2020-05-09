/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftRevVarPopFieldsBase
 * auto generated base class for the model HerkunftRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const HerkunftRevVarPopFieldsModelBase = ModelBase
  .named('HerkunftRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_var_pop_fields"), "herkunft_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromHerkunftRevVarPopFields() {
  return new HerkunftRevVarPopFieldsModelSelector()
}

export const herkunftRevVarPopFieldsModelPrimitives = selectFromHerkunftRevVarPopFields()._depth
