/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungRevVarPopFieldsBase
 * auto generated base class for the model TeilzaehlungRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const TeilzaehlungRevVarPopFieldsModelBase = ModelBase
  .named('TeilzaehlungRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_var_pop_fields"), "teilzaehlung_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromTeilzaehlungRevVarPopFields() {
  return new TeilzaehlungRevVarPopFieldsModelSelector()
}

export const teilzaehlungRevVarPopFieldsModelPrimitives = selectFromTeilzaehlungRevVarPopFields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
