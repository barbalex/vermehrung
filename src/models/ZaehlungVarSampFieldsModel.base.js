/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungVarSampFieldsBase
 * auto generated base class for the model ZaehlungVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const ZaehlungVarSampFieldsModelBase = ModelBase
  .named('ZaehlungVarSampFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_var_samp_fields"), "zaehlung_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungVarSampFields() {
  return new ZaehlungVarSampFieldsModelSelector()
}

export const zaehlungVarSampFieldsModelPrimitives = selectFromZaehlungVarSampFields()._depth
