/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"
import { TeilzaehlungAggregateModel } from "./TeilzaehlungAggregateModel"
import { TeilzaehlungAggregateModelSelector } from "./TeilzaehlungAggregateModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"
import { ZaehlungModel } from "./ZaehlungModel"
import { ZaehlungModelSelector } from "./ZaehlungModel.base"


/**
 * TeilzaehlungRevBase
 * auto generated base class for the model TeilzaehlungRevModel.
 *
 * columns and relationships of "teilzaehlung_rev"
 */
export const TeilzaehlungRevModelBase = ModelBase
  .named('TeilzaehlungRev')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev"), "teilzaehlung_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    auspflanzbereit_beschreibung: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.frozen()),
    prognose_von_tz: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    teilkultur: types.union(types.undefined, types.null, types.late(() => TeilkulturModel)),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    teilzaehlung: types.union(types.undefined, types.null, types.late(() => TeilzaehlungModel)),
    /** An array relationship */
    teilzaehlungs: types.union(types.undefined, types.array(types.late(() => TeilzaehlungModel))),
    /** An aggregated array relationship */
    teilzaehlungs_aggregate: types.union(types.undefined, types.late(() => TeilzaehlungAggregateModel)),
    /** An object relationship */
    zaehlung: types.union(types.undefined, types.null, types.late(() => ZaehlungModel)),
    zaehlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
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
  teilkultur(builder) { return this.__child(`teilkultur`, TeilkulturModelSelector, builder) }
  teilzaehlung(builder) { return this.__child(`teilzaehlung`, TeilzaehlungModelSelector, builder) }
  teilzaehlungs(builder) { return this.__child(`teilzaehlungs`, TeilzaehlungModelSelector, builder) }
  teilzaehlungs_aggregate(builder) { return this.__child(`teilzaehlungs_aggregate`, TeilzaehlungAggregateModelSelector, builder) }
  zaehlung(builder) { return this.__child(`zaehlung`, ZaehlungModelSelector, builder) }
}
export function selectFromTeilzaehlungRev() {
  return new TeilzaehlungRevModelSelector()
}

export const teilzaehlungRevModelPrimitives = selectFromTeilzaehlungRev()._deleted._depth._parent_rev._rev._revisions.andere_menge.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.auspflanzbereit_beschreibung.bemerkungen.changed.changed_by.prognose_von_tz.teilkultur_id.zaehlung_id
