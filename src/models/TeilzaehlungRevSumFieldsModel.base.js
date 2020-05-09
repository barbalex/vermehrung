/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungRevSumFieldsBase
 * auto generated base class for the model TeilzaehlungRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const TeilzaehlungRevSumFieldsModelBase = ModelBase
  .named('TeilzaehlungRevSumFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_sum_fields"), "teilzaehlung_rev_sum_fields"),
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

export class TeilzaehlungRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromTeilzaehlungRevSumFields() {
  return new TeilzaehlungRevSumFieldsModelSelector()
}

export const teilzaehlungRevSumFieldsModelPrimitives = selectFromTeilzaehlungRevSumFields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
