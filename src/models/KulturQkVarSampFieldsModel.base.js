/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkVarSampFieldsBase
 * auto generated base class for the model KulturQkVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const KulturQkVarSampFieldsModelBase = ModelBase
  .named('KulturQkVarSampFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_var_samp_fields"), "kultur_qk_var_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkVarSampFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkVarSampFields() {
  return new KulturQkVarSampFieldsModelSelector()
}

export const kulturQkVarSampFieldsModelPrimitives = selectFromKulturQkVarSampFields().sort
