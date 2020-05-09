/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevVarSampFieldsBase
 * auto generated base class for the model KulturOptionRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const KulturOptionRevVarSampFieldsModelBase = ModelBase
  .named('KulturOptionRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_var_samp_fields"), "kultur_option_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevVarSampFields() {
  return new KulturOptionRevVarSampFieldsModelSelector()
}

export const kulturOptionRevVarSampFieldsModelPrimitives = selectFromKulturOptionRevVarSampFields()._depth
