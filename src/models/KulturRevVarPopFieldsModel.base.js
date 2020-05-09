/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturRevVarPopFieldsBase
 * auto generated base class for the model KulturRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const KulturRevVarPopFieldsModelBase = ModelBase
  .named('KulturRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_var_pop_fields"), "kultur_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturRevVarPopFields() {
  return new KulturRevVarPopFieldsModelSelector()
}

export const kulturRevVarPopFieldsModelPrimitives = selectFromKulturRevVarPopFields()._depth.von_anzahl_individuen
