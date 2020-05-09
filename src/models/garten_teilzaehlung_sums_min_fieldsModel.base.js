/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_teilzaehlung_sums_min_fieldsBase
 * auto generated base class for the model garten_teilzaehlung_sums_min_fieldsModel.
 *
 * aggregate min on columns
 */
export const garten_teilzaehlung_sums_min_fieldsModelBase = ModelBase
  .named('garten_teilzaehlung_sums_min_fields')
  .props({
    __typename: types.optional(types.literal("garten_teilzaehlung_sums_min_fields"), "garten_teilzaehlung_sums_min_fields"),
    garten_anzahl_kulturen: types.union(types.undefined, types.null, types.frozen()),
    garten_bemerkungen: types.union(types.undefined, types.null, types.string),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    garten_name: types.union(types.undefined, types.null, types.string),
    garten_ort: types.union(types.undefined, types.null, types.string),
    garten_person_id: types.union(types.undefined, types.null, types.frozen()),
    garten_person_name: types.union(types.undefined, types.null, types.string),
    garten_plz: types.union(types.undefined, types.null, types.integer),
    garten_strasse: types.union(types.undefined, types.null, types.string),
    kultur_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.frozen()),
    kultur_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.frozen()),
    kultur_anzahl_pflanzen: types.union(types.undefined, types.null, types.frozen()),
    kultur_art_id: types.union(types.undefined, types.null, types.frozen()),
    kultur_art_name: types.union(types.undefined, types.null, types.string),
    kultur_bemerkungen: types.union(types.undefined, types.null, types.string),
    kultur_events_anzahl: types.union(types.undefined, types.null, types.frozen()),
    kultur_events_datum_beschreibung: types.union(types.undefined, types.null, types.string),
    kultur_herkunft_nr: types.union(types.undefined, types.null, types.string),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    kultur_letzter_event_beschreibung: types.union(types.undefined, types.null, types.string),
    kultur_letzter_event_datum: types.union(types.undefined, types.null, types.frozen()),
    kultur_letzter_event_id: types.union(types.undefined, types.null, types.frozen()),
    kultur_letzter_event_person_name: types.union(types.undefined, types.null, types.string),
    kultur_letzter_event_teilkultur_bemerkungen: types.union(types.undefined, types.null, types.string),
    kultur_letzter_event_teilkultur_name: types.union(types.undefined, types.null, types.string),
    kultur_letzter_event_teilkultur_ort1: types.union(types.undefined, types.null, types.string),
    kultur_letzter_event_teilkultur_ort2: types.union(types.undefined, types.null, types.string),
    kultur_letzter_event_teilkultur_ort3: types.union(types.undefined, types.null, types.string),
    kultur_teilkulturen_anzahl: types.union(types.undefined, types.null, types.frozen()),
    kultur_teilkulturen_namen: types.union(types.undefined, types.null, types.string),
    kultur_von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    kultur_zaehlungen_anzahl: types.union(types.undefined, types.null, types.frozen()),
    teilzaehlung_andere_menge: types.union(types.undefined, types.null, types.string),
    teilzaehlung_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    teilzaehlung_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.integer),
    teilzaehlung_anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    teilzaehlung_auspflanzbereit_beschreibung: types.union(types.undefined, types.null, types.string),
    teilzaehlung_bemerkungen: types.union(types.undefined, types.null, types.string),
    teilzaehlung_id: types.union(types.undefined, types.null, types.frozen()),
    teilzaehlung_teilkultur_bemerkungen: types.union(types.undefined, types.null, types.string),
    teilzaehlung_teilkultur_name: types.union(types.undefined, types.null, types.string),
    teilzaehlung_teilkultur_ort1: types.union(types.undefined, types.null, types.string),
    teilzaehlung_teilkultur_ort2: types.union(types.undefined, types.null, types.string),
    teilzaehlung_teilkultur_ort3: types.union(types.undefined, types.null, types.string),
    zaehlung_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.frozen()),
    zaehlung_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.frozen()),
    zaehlung_anzahl_pflanzen: types.union(types.undefined, types.null, types.frozen()),
    zaehlung_anzahl_teilzaehlungen: types.union(types.undefined, types.null, types.frozen()),
    zaehlung_bemerkungen: types.union(types.undefined, types.null, types.string),
    zaehlung_datum: types.union(types.undefined, types.null, types.frozen()),
    zaehlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_teilzaehlung_sums_min_fieldsModelSelector extends QueryBuilder {
  get garten_anzahl_kulturen() { return this.__attr(`garten_anzahl_kulturen`) }
  get garten_bemerkungen() { return this.__attr(`garten_bemerkungen`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get garten_name() { return this.__attr(`garten_name`) }
  get garten_ort() { return this.__attr(`garten_ort`) }
  get garten_person_id() { return this.__attr(`garten_person_id`) }
  get garten_person_name() { return this.__attr(`garten_person_name`) }
  get garten_plz() { return this.__attr(`garten_plz`) }
  get garten_strasse() { return this.__attr(`garten_strasse`) }
  get kultur_anzahl_auspflanzbereit() { return this.__attr(`kultur_anzahl_auspflanzbereit`) }
  get kultur_anzahl_mutterpflanzen() { return this.__attr(`kultur_anzahl_mutterpflanzen`) }
  get kultur_anzahl_pflanzen() { return this.__attr(`kultur_anzahl_pflanzen`) }
  get kultur_art_id() { return this.__attr(`kultur_art_id`) }
  get kultur_art_name() { return this.__attr(`kultur_art_name`) }
  get kultur_bemerkungen() { return this.__attr(`kultur_bemerkungen`) }
  get kultur_events_anzahl() { return this.__attr(`kultur_events_anzahl`) }
  get kultur_events_datum_beschreibung() { return this.__attr(`kultur_events_datum_beschreibung`) }
  get kultur_herkunft_nr() { return this.__attr(`kultur_herkunft_nr`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get kultur_letzter_event_beschreibung() { return this.__attr(`kultur_letzter_event_beschreibung`) }
  get kultur_letzter_event_datum() { return this.__attr(`kultur_letzter_event_datum`) }
  get kultur_letzter_event_id() { return this.__attr(`kultur_letzter_event_id`) }
  get kultur_letzter_event_person_name() { return this.__attr(`kultur_letzter_event_person_name`) }
  get kultur_letzter_event_teilkultur_bemerkungen() { return this.__attr(`kultur_letzter_event_teilkultur_bemerkungen`) }
  get kultur_letzter_event_teilkultur_name() { return this.__attr(`kultur_letzter_event_teilkultur_name`) }
  get kultur_letzter_event_teilkultur_ort1() { return this.__attr(`kultur_letzter_event_teilkultur_ort1`) }
  get kultur_letzter_event_teilkultur_ort2() { return this.__attr(`kultur_letzter_event_teilkultur_ort2`) }
  get kultur_letzter_event_teilkultur_ort3() { return this.__attr(`kultur_letzter_event_teilkultur_ort3`) }
  get kultur_teilkulturen_anzahl() { return this.__attr(`kultur_teilkulturen_anzahl`) }
  get kultur_teilkulturen_namen() { return this.__attr(`kultur_teilkulturen_namen`) }
  get kultur_von_anzahl_individuen() { return this.__attr(`kultur_von_anzahl_individuen`) }
  get kultur_zaehlungen_anzahl() { return this.__attr(`kultur_zaehlungen_anzahl`) }
  get teilzaehlung_andere_menge() { return this.__attr(`teilzaehlung_andere_menge`) }
  get teilzaehlung_anzahl_auspflanzbereit() { return this.__attr(`teilzaehlung_anzahl_auspflanzbereit`) }
  get teilzaehlung_anzahl_mutterpflanzen() { return this.__attr(`teilzaehlung_anzahl_mutterpflanzen`) }
  get teilzaehlung_anzahl_pflanzen() { return this.__attr(`teilzaehlung_anzahl_pflanzen`) }
  get teilzaehlung_auspflanzbereit_beschreibung() { return this.__attr(`teilzaehlung_auspflanzbereit_beschreibung`) }
  get teilzaehlung_bemerkungen() { return this.__attr(`teilzaehlung_bemerkungen`) }
  get teilzaehlung_id() { return this.__attr(`teilzaehlung_id`) }
  get teilzaehlung_teilkultur_bemerkungen() { return this.__attr(`teilzaehlung_teilkultur_bemerkungen`) }
  get teilzaehlung_teilkultur_name() { return this.__attr(`teilzaehlung_teilkultur_name`) }
  get teilzaehlung_teilkultur_ort1() { return this.__attr(`teilzaehlung_teilkultur_ort1`) }
  get teilzaehlung_teilkultur_ort2() { return this.__attr(`teilzaehlung_teilkultur_ort2`) }
  get teilzaehlung_teilkultur_ort3() { return this.__attr(`teilzaehlung_teilkultur_ort3`) }
  get zaehlung_anzahl_auspflanzbereit() { return this.__attr(`zaehlung_anzahl_auspflanzbereit`) }
  get zaehlung_anzahl_mutterpflanzen() { return this.__attr(`zaehlung_anzahl_mutterpflanzen`) }
  get zaehlung_anzahl_pflanzen() { return this.__attr(`zaehlung_anzahl_pflanzen`) }
  get zaehlung_anzahl_teilzaehlungen() { return this.__attr(`zaehlung_anzahl_teilzaehlungen`) }
  get zaehlung_bemerkungen() { return this.__attr(`zaehlung_bemerkungen`) }
  get zaehlung_datum() { return this.__attr(`zaehlung_datum`) }
  get zaehlung_id() { return this.__attr(`zaehlung_id`) }
}
export function selectFromgarten_teilzaehlung_sums_min_fields() {
  return new garten_teilzaehlung_sums_min_fieldsModelSelector()
}

export const garten_teilzaehlung_sums_min_fieldsModelPrimitives = selectFromgarten_teilzaehlung_sums_min_fields().garten_anzahl_kulturen.garten_bemerkungen.garten_id.garten_name.garten_ort.garten_person_id.garten_person_name.garten_plz.garten_strasse.kultur_anzahl_auspflanzbereit.kultur_anzahl_mutterpflanzen.kultur_anzahl_pflanzen.kultur_art_id.kultur_art_name.kultur_bemerkungen.kultur_events_anzahl.kultur_events_datum_beschreibung.kultur_herkunft_nr.kultur_id.kultur_letzter_event_beschreibung.kultur_letzter_event_datum.kultur_letzter_event_id.kultur_letzter_event_person_name.kultur_letzter_event_teilkultur_bemerkungen.kultur_letzter_event_teilkultur_name.kultur_letzter_event_teilkultur_ort1.kultur_letzter_event_teilkultur_ort2.kultur_letzter_event_teilkultur_ort3.kultur_teilkulturen_anzahl.kultur_teilkulturen_namen.kultur_von_anzahl_individuen.kultur_zaehlungen_anzahl.teilzaehlung_andere_menge.teilzaehlung_anzahl_auspflanzbereit.teilzaehlung_anzahl_mutterpflanzen.teilzaehlung_anzahl_pflanzen.teilzaehlung_auspflanzbereit_beschreibung.teilzaehlung_bemerkungen.teilzaehlung_id.teilzaehlung_teilkultur_bemerkungen.teilzaehlung_teilkultur_name.teilzaehlung_teilkultur_ort1.teilzaehlung_teilkultur_ort2.teilzaehlung_teilkultur_ort3.zaehlung_anzahl_auspflanzbereit.zaehlung_anzahl_mutterpflanzen.zaehlung_anzahl_pflanzen.zaehlung_anzahl_teilzaehlungen.zaehlung_bemerkungen.zaehlung_datum.zaehlung_id
