/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturVarPopFieldsBase
 * auto generated base class for the model TeilkulturVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const TeilkulturVarPopFieldsModelBase = ModelBase
  .named('TeilkulturVarPopFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_var_pop_fields"), "teilkultur_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturVarPopFields() {
  return new TeilkulturVarPopFieldsModelSelector()
}

export const teilkulturVarPopFieldsModelPrimitives = selectFromTeilkulturVarPopFields()._depth
