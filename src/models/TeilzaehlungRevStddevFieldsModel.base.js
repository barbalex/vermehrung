/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungRevStddevFieldsBase
 * auto generated base class for the model TeilzaehlungRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const TeilzaehlungRevStddevFieldsModelBase = ModelBase
  .named('TeilzaehlungRevStddevFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_stddev_fields"), "teilzaehlung_rev_stddev_fields"),
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

export class TeilzaehlungRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromTeilzaehlungRevStddevFields() {
  return new TeilzaehlungRevStddevFieldsModelSelector()
}

export const teilzaehlungRevStddevFieldsModelPrimitives = selectFromTeilzaehlungRevStddevFields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
