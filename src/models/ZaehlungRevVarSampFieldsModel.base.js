/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevVarSampFieldsBase
 * auto generated base class for the model ZaehlungRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const ZaehlungRevVarSampFieldsModelBase = ModelBase
  .named('ZaehlungRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_var_samp_fields"), "zaehlung_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevVarSampFields() {
  return new ZaehlungRevVarSampFieldsModelSelector()
}

export const zaehlungRevVarSampFieldsModelPrimitives = selectFromZaehlungRevVarSampFields()._depth
