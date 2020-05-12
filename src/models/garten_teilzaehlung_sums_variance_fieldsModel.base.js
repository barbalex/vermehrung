/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_teilzaehlung_sums_variance_fieldsBase
 * auto generated base class for the model garten_teilzaehlung_sums_variance_fieldsModel.
 */
export const garten_teilzaehlung_sums_variance_fieldsModelBase = ModelBase
  .named('garten_teilzaehlung_sums_variance_fields')
  .props({
    __typename: types.optional(types.literal("garten_teilzaehlung_sums_variance_fields"), "garten_teilzaehlung_sums_variance_fields"),
    garten_anzahl_kulturen: types.union(types.undefined, types.null, types.number),
    garten_plz: types.union(types.undefined, types.null, types.number),
    kultur_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    kultur_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.number),
    kultur_anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    kultur_events_anzahl: types.union(types.undefined, types.null, types.number),
    kultur_teilkulturen_anzahl: types.union(types.undefined, types.null, types.number),
    kultur_von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
    kultur_zaehlungen_anzahl: types.union(types.undefined, types.null, types.number),
    teilzaehlung_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    teilzaehlung_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.number),
    teilzaehlung_anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    zaehlung_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    zaehlung_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.number),
    zaehlung_anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    zaehlung_anzahl_teilzaehlungen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_teilzaehlung_sums_variance_fieldsModelSelector extends QueryBuilder {
  get garten_anzahl_kulturen() { return this.__attr(`garten_anzahl_kulturen`) }
  get garten_plz() { return this.__attr(`garten_plz`) }
  get kultur_anzahl_auspflanzbereit() { return this.__attr(`kultur_anzahl_auspflanzbereit`) }
  get kultur_anzahl_mutterpflanzen() { return this.__attr(`kultur_anzahl_mutterpflanzen`) }
  get kultur_anzahl_pflanzen() { return this.__attr(`kultur_anzahl_pflanzen`) }
  get kultur_events_anzahl() { return this.__attr(`kultur_events_anzahl`) }
  get kultur_teilkulturen_anzahl() { return this.__attr(`kultur_teilkulturen_anzahl`) }
  get kultur_von_anzahl_individuen() { return this.__attr(`kultur_von_anzahl_individuen`) }
  get kultur_zaehlungen_anzahl() { return this.__attr(`kultur_zaehlungen_anzahl`) }
  get teilzaehlung_anzahl_auspflanzbereit() { return this.__attr(`teilzaehlung_anzahl_auspflanzbereit`) }
  get teilzaehlung_anzahl_mutterpflanzen() { return this.__attr(`teilzaehlung_anzahl_mutterpflanzen`) }
  get teilzaehlung_anzahl_pflanzen() { return this.__attr(`teilzaehlung_anzahl_pflanzen`) }
  get zaehlung_anzahl_auspflanzbereit() { return this.__attr(`zaehlung_anzahl_auspflanzbereit`) }
  get zaehlung_anzahl_mutterpflanzen() { return this.__attr(`zaehlung_anzahl_mutterpflanzen`) }
  get zaehlung_anzahl_pflanzen() { return this.__attr(`zaehlung_anzahl_pflanzen`) }
  get zaehlung_anzahl_teilzaehlungen() { return this.__attr(`zaehlung_anzahl_teilzaehlungen`) }
}
export function selectFromgarten_teilzaehlung_sums_variance_fields() {
  return new garten_teilzaehlung_sums_variance_fieldsModelSelector()
}

export const garten_teilzaehlung_sums_variance_fieldsModelPrimitives = selectFromgarten_teilzaehlung_sums_variance_fields().garten_anzahl_kulturen.garten_plz.kultur_anzahl_auspflanzbereit.kultur_anzahl_mutterpflanzen.kultur_anzahl_pflanzen.kultur_events_anzahl.kultur_teilkulturen_anzahl.kultur_von_anzahl_individuen.kultur_zaehlungen_anzahl.teilzaehlung_anzahl_auspflanzbereit.teilzaehlung_anzahl_mutterpflanzen.teilzaehlung_anzahl_pflanzen.zaehlung_anzahl_auspflanzbereit.zaehlung_anzahl_mutterpflanzen.zaehlung_anzahl_pflanzen.zaehlung_anzahl_teilzaehlungen
