/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungVarSampFieldsBase
 * auto generated base class for the model TeilzaehlungVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const TeilzaehlungVarSampFieldsModelBase = ModelBase
  .named('TeilzaehlungVarSampFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_var_samp_fields"), "teilzaehlung_var_samp_fields"),
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

export class TeilzaehlungVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromTeilzaehlungVarSampFields() {
  return new TeilzaehlungVarSampFieldsModelSelector()
}

export const teilzaehlungVarSampFieldsModelPrimitives = selectFromTeilzaehlungVarSampFields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
