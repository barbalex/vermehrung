/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturVarPopFieldsBase
 * auto generated base class for the model KulturVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const KulturVarPopFieldsModelBase = ModelBase
  .named('KulturVarPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_var_pop_fields"), "kultur_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturVarPopFields() {
  return new KulturVarPopFieldsModelSelector()
}

export const kulturVarPopFieldsModelPrimitives = selectFromKulturVarPopFields()._depth.von_anzahl_individuen
