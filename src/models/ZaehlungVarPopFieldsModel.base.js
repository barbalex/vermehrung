/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungVarPopFieldsBase
 * auto generated base class for the model ZaehlungVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const ZaehlungVarPopFieldsModelBase = ModelBase
  .named('ZaehlungVarPopFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_var_pop_fields"), "zaehlung_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungVarPopFields() {
  return new ZaehlungVarPopFieldsModelSelector()
}

export const zaehlungVarPopFieldsModelPrimitives = selectFromZaehlungVarPopFields()._depth
