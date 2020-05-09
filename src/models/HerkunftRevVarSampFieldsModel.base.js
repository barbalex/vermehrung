/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftRevVarSampFieldsBase
 * auto generated base class for the model HerkunftRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const HerkunftRevVarSampFieldsModelBase = ModelBase
  .named('HerkunftRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_var_samp_fields"), "herkunft_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromHerkunftRevVarSampFields() {
  return new HerkunftRevVarSampFieldsModelSelector()
}

export const herkunftRevVarSampFieldsModelPrimitives = selectFromHerkunftRevVarSampFields()._depth
