/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturRevVarSampFieldsBase
 * auto generated base class for the model TeilkulturRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const TeilkulturRevVarSampFieldsModelBase = ModelBase
  .named('TeilkulturRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_var_samp_fields"), "teilkultur_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturRevVarSampFields() {
  return new TeilkulturRevVarSampFieldsModelSelector()
}

export const teilkulturRevVarSampFieldsModelPrimitives = selectFromTeilkulturRevVarSampFields()._depth
