/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"


/**
 * KulturOptionRevBase
 * auto generated base class for the model KulturOptionRevModel.
 *
 * columns and relationships of "kultur_option_rev"
 */
export const KulturOptionRevModelBase = ModelBase
  .named('KulturOptionRev')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev"), "kultur_option_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ev_datum: types.union(types.undefined, types.null, types.boolean),
    ev_geplant: types.union(types.undefined, types.null, types.boolean),
    ev_person_id: types.union(types.undefined, types.null, types.boolean),
    ev_teilkultur_id: types.union(types.undefined, types.null, types.boolean),
    /** An object relationship */
    kultur: types.union(types.undefined, types.late(() => KulturModel)),
    kultur_id: types.union(types.undefined, types.frozen()),
    tk: types.union(types.undefined, types.null, types.boolean),
    tk_bemerkungen: types.union(types.undefined, types.null, types.boolean),
    tz_andere_menge: types.union(types.undefined, types.null, types.boolean),
    tz_anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.boolean),
    tz_auspflanzbereit_beschreibung: types.union(types.undefined, types.null, types.boolean),
    tz_bemerkungen: types.union(types.undefined, types.null, types.boolean),
    tz_teilkultur_id: types.union(types.undefined, types.null, types.boolean),
    z_bemerkungen: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ev_datum() { return this.__attr(`ev_datum`) }
  get ev_geplant() { return this.__attr(`ev_geplant`) }
  get ev_person_id() { return this.__attr(`ev_person_id`) }
  get ev_teilkultur_id() { return this.__attr(`ev_teilkultur_id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get tk() { return this.__attr(`tk`) }
  get tk_bemerkungen() { return this.__attr(`tk_bemerkungen`) }
  get tz_andere_menge() { return this.__attr(`tz_andere_menge`) }
  get tz_anzahl_mutterpflanzen() { return this.__attr(`tz_anzahl_mutterpflanzen`) }
  get tz_auspflanzbereit_beschreibung() { return this.__attr(`tz_auspflanzbereit_beschreibung`) }
  get tz_bemerkungen() { return this.__attr(`tz_bemerkungen`) }
  get tz_teilkultur_id() { return this.__attr(`tz_teilkultur_id`) }
  get z_bemerkungen() { return this.__attr(`z_bemerkungen`) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
}
export function selectFromKulturOptionRev() {
  return new KulturOptionRevModelSelector()
}

export const kulturOptionRevModelPrimitives = selectFromKulturOptionRev()._deleted._depth._parent_rev._rev._revisions.ev_datum.ev_geplant.ev_person_id.ev_teilkultur_id.kultur_id.tk.tk_bemerkungen.tz_andere_menge.tz_anzahl_mutterpflanzen.tz_auspflanzbereit_beschreibung.tz_bemerkungen.tz_teilkultur_id.z_bemerkungen
