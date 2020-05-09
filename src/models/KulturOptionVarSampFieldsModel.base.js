/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionVarSampFieldsBase
 * auto generated base class for the model KulturOptionVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const KulturOptionVarSampFieldsModelBase = ModelBase
  .named('KulturOptionVarSampFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_var_samp_fields"), "kultur_option_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionVarSampFields() {
  return new KulturOptionVarSampFieldsModelSelector()
}

export const kulturOptionVarSampFieldsModelPrimitives = selectFromKulturOptionVarSampFields()._depth
