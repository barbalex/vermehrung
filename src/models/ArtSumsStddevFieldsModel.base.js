/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtSumsStddevFieldsBase
 * auto generated base class for the model ArtSumsStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const ArtSumsStddevFieldsModelBase = ModelBase
  .named('ArtSumsStddevFields')
  .props({
    __typename: types.optional(types.literal("art_sums_stddev_fields"), "art_sums_stddev_fields"),
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

export class ArtSumsStddevFieldsModelSelector extends QueryBuilder {
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get sum_anzahl_auspflanzbereit() { return this.__attr(`sum_anzahl_auspflanzbereit`) }
  get sum_anzahl_pflanzen() { return this.__attr(`sum_anzahl_pflanzen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromArtSumsStddevFields() {
  return new ArtSumsStddevFieldsModelSelector()
}

export const artSumsStddevFieldsModelPrimitives = selectFromArtSumsStddevFields().anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.gramm_samen.sum_anzahl_auspflanzbereit.sum_anzahl_pflanzen.von_anzahl_individuen
