/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilzaehlungMinFieldsBase
 * auto generated base class for the model TeilzaehlungMinFieldsModel.
 *
 * aggregate min on columns
 */
export const TeilzaehlungMinFieldsModelBase = ModelBase
  .named('TeilzaehlungMinFields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_min_fields"), "teilzaehlung_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    auspflanzbereit_beschreibung: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    prognose_von_tz: types.union(types.undefined, types.null, types.frozen()),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
    zaehlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungMinFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get auspflanzbereit_beschreibung() { return this.__attr(`auspflanzbereit_beschreibung`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get prognose_von_tz() { return this.__attr(`prognose_von_tz`) }
  get teilkultur_id() { return this.__attr(`teilkultur_id`) }
  get zaehlung_id() { return this.__attr(`zaehlung_id`) }
}
export function selectFromTeilzaehlungMinFields() {
  return new TeilzaehlungMinFieldsModelSelector()
}

export const teilzaehlungMinFieldsModelPrimitives = selectFromTeilzaehlungMinFields()._depth._parent_rev._rev.andere_menge.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.auspflanzbereit_beschreibung.bemerkungen.changed.changed_by.prognose_von_tz.teilkultur_id.zaehlung_id
