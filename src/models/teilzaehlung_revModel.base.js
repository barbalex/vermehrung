/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"
import { teilzaehlungModel } from "./teilzaehlungModel"
import { teilzaehlungModelSelector } from "./teilzaehlungModel.base"
import { teilzaehlung_aggregateModel } from "./teilzaehlung_aggregateModel"
import { teilzaehlung_aggregateModelSelector } from "./teilzaehlung_aggregateModel.base"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"


/**
 * teilzaehlung_revBase
 * auto generated base class for the model teilzaehlung_revModel.
 *
 * columns and relationships of "teilzaehlung_rev"
 */
export const teilzaehlung_revModelBase = ModelBase
  .named('teilzaehlung_rev')
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
    teilkultur: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkulturModel))),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    teilzaehlung: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlungModel))),
    /** An array relationship */
    teilzaehlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilzaehlungModel)))),
    /** An aggregated array relationship */
    teilzaehlungs_aggregate: types.union(types.undefined, types.late(() => teilzaehlung_aggregateModel)),
    /** An object relationship */
    zaehlung: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlungModel))),
    zaehlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_revModelSelector extends QueryBuilder {
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
  teilkultur(builder) { return this.__child(`teilkultur`, teilkulturModelSelector, builder) }
  teilzaehlung(builder) { return this.__child(`teilzaehlung`, teilzaehlungModelSelector, builder) }
  teilzaehlungs(builder) { return this.__child(`teilzaehlungs`, teilzaehlungModelSelector, builder) }
  teilzaehlungs_aggregate(builder) { return this.__child(`teilzaehlungs_aggregate`, teilzaehlung_aggregateModelSelector, builder) }
  zaehlung(builder) { return this.__child(`zaehlung`, zaehlungModelSelector, builder) }
}
export function selectFromteilzaehlung_rev() {
  return new teilzaehlung_revModelSelector()
}

export const teilzaehlung_revModelPrimitives = selectFromteilzaehlung_rev()._deleted._depth._parent_rev._rev._revisions.andere_menge.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.auspflanzbereit_beschreibung.bemerkungen.changed.changed_by.prognose_von_tz.teilkultur_id.zaehlung_id
