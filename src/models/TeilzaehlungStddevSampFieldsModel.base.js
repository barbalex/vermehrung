/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungStddevSampFieldsBase
 * auto generated base class for the model TeilzaehlungStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const TeilzaehlungStddevSampFieldsModelBase = ModelBase
  .named('TeilzaehlungStddevSampFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_stddev_samp_fields"), "teilzaehlung_stddev_samp_fields"),
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

export class TeilzaehlungStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromTeilzaehlungStddevSampFields() {
  return new TeilzaehlungStddevSampFieldsModelSelector()
}

export const teilzaehlungStddevSampFieldsModelPrimitives = selectFromTeilzaehlungStddevSampFields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
