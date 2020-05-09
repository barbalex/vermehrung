/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkVarPopFieldsBase
 * auto generated base class for the model KulturQkVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const KulturQkVarPopFieldsModelBase = ModelBase
  .named('KulturQkVarPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_var_pop_fields"), "kultur_qk_var_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkVarPopFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkVarPopFields() {
  return new KulturQkVarPopFieldsModelSelector()
}

export const kulturQkVarPopFieldsModelPrimitives = selectFromKulturQkVarPopFields().sort
