/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * GartenRevVarSampFieldsBase
 * auto generated base class for the model GartenRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const GartenRevVarSampFieldsModelBase = ModelBase
  .named('GartenRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("garten_rev_var_samp_fields"), "garten_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromGartenRevVarSampFields() {
  return new GartenRevVarSampFieldsModelSelector()
}

export const gartenRevVarSampFieldsModelPrimitives = selectFromGartenRevVarSampFields()._depth.plz
