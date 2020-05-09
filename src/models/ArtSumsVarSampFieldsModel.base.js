/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtSumsVarSampFieldsBase
 * auto generated base class for the model ArtSumsVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const ArtSumsVarSampFieldsModelBase = ModelBase
  .named('ArtSumsVarSampFields')
  .props({
    __typename: types.optional(types.literal("art_sums_var_samp_fields"), "art_sums_var_samp_fields"),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    sum_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    sum_anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtSumsVarSampFieldsModelSelector extends QueryBuilder {
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get sum_anzahl_auspflanzbereit() { return this.__attr(`sum_anzahl_auspflanzbereit`) }
  get sum_anzahl_pflanzen() { return this.__attr(`sum_anzahl_pflanzen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromArtSumsVarSampFields() {
  return new ArtSumsVarSampFieldsModelSelector()
}

export const artSumsVarSampFieldsModelPrimitives = selectFromArtSumsVarSampFields().anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.gramm_samen.sum_anzahl_auspflanzbereit.sum_anzahl_pflanzen.von_anzahl_individuen
