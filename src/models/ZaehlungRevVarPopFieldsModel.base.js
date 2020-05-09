/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevVarPopFieldsBase
 * auto generated base class for the model ZaehlungRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const ZaehlungRevVarPopFieldsModelBase = ModelBase
  .named('ZaehlungRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_var_pop_fields"), "zaehlung_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevVarPopFields() {
  return new ZaehlungRevVarPopFieldsModelSelector()
}

export const zaehlungRevVarPopFieldsModelPrimitives = selectFromZaehlungRevVarPopFields()._depth
