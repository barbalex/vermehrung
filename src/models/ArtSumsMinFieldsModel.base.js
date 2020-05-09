/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtSumsMinFieldsBase
 * auto generated base class for the model ArtSumsMinFieldsModel.
 *
 * aggregate min on columns
 */
export const ArtSumsMinFieldsModelBase = ModelBase
  .named('ArtSumsMinFields')
  .props({
    __typename: types.optional(types.literal("art_sums_min_fields"), "art_sums_min_fields"),
    action: types.union(types.undefined, types.null, types.string),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.frozen()),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.frozen()),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.frozen()),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    auspflanzbereit_beschreibung: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    partitioner: types.union(types.undefined, types.null, types.frozen()),
    sum_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.frozen()),
    sum_anzahl_pflanzen: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtSumsMinFieldsModelSelector extends QueryBuilder {
  get action() { return this.__attr(`action`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get auspflanzbereit_beschreibung() { return this.__attr(`auspflanzbereit_beschreibung`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get datum() { return this.__attr(`datum`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get partitioner() { return this.__attr(`partitioner`) }
  get sum_anzahl_auspflanzbereit() { return this.__attr(`sum_anzahl_auspflanzbereit`) }
  get sum_anzahl_pflanzen() { return this.__attr(`sum_anzahl_pflanzen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromArtSumsMinFields() {
  return new ArtSumsMinFieldsModelSelector()
}

export const artSumsMinFieldsModelPrimitives = selectFromArtSumsMinFields().action.andere_menge.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.art_id.auspflanzbereit_beschreibung.bemerkungen.datum.gramm_samen.partitioner.sum_anzahl_auspflanzbereit.sum_anzahl_pflanzen.von_anzahl_individuen
