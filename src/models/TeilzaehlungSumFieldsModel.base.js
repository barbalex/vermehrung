/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungSumFieldsBase
 * auto generated base class for the model TeilzaehlungSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const TeilzaehlungSumFieldsModelBase = ModelBase
  .named('TeilzaehlungSumFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_sum_fields"), "teilzaehlung_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromTeilzaehlungSumFields() {
  return new TeilzaehlungSumFieldsModelSelector()
}

export const teilzaehlungSumFieldsModelPrimitives = selectFromTeilzaehlungSumFields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
