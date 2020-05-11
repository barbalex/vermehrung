/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_aggregateModel } from "./event_aggregateModel"
import { event_aggregateModelSelector } from "./event_aggregateModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_aggregateModel } from "./lieferung_aggregateModel"
import { lieferung_aggregateModelSelector } from "./lieferung_aggregateModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_aggregateModel } from "./sammel_lieferung_aggregateModel"
import { sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"
import { teilkultur_aggregateModel } from "./teilkultur_aggregateModel"
import { teilkultur_aggregateModelSelector } from "./teilkultur_aggregateModel.base"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"
import { zaehlung_aggregateModel } from "./zaehlung_aggregateModel"
import { zaehlung_aggregateModelSelector } from "./zaehlung_aggregateModel.base"


/**
 * kultur_revBase
 * auto generated base class for the model kultur_revModel.
 *
 * columns and relationships of "kultur_rev"
 */
export const kultur_revModelBase = ModelBase
  .named('kultur_rev')
  .props({
    __typename: types.optional(types.literal("kultur_rev"), "kultur_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    /** An object relationship */
    art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    erhaltungskultur: types.union(types.undefined, types.null, types.boolean),
    /** An array relationship */
    events: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
    /** An aggregated array relationship */
    events_aggregate: types.union(types.undefined, types.late(() => event_aggregateModel)),
    /** An object relationship */
    garten: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    herkunft: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    lieferungsByNachKulturId: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    /** An aggregated array relationship */
    lieferungsByNachKulturId_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    /** An array relationship */
    lieferungsByVonKulturId: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    /** An aggregated array relationship */
    lieferungsByVonKulturId_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    /** An array relationship */
    sammelLieferungsByNachKulturId: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    /** An aggregated array relationship */
    sammelLieferungsByNachKulturId_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    /** An array relationship */
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    /** An aggregated array relationship */
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    /** An array relationship */
    teilkulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkulturModel)))),
    /** An aggregated array relationship */
    teilkulturs_aggregate: types.union(types.undefined, types.late(() => teilkultur_aggregateModel)),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    /** An array relationship */
    zaehlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => zaehlungModel)))),
    /** An aggregated array relationship */
    zaehlungs_aggregate: types.union(types.undefined, types.late(() => zaehlung_aggregateModel)),
    zwischenlager: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get aktiv() { return this.__attr(`aktiv`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get erhaltungskultur() { return this.__attr(`erhaltungskultur`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get zwischenlager() { return this.__attr(`zwischenlager`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  events(builder) { return this.__child(`events`, eventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, event_aggregateModelSelector, builder) }
  garten(builder) { return this.__child(`garten`, gartenModelSelector, builder) }
  herkunft(builder) { return this.__child(`herkunft`, herkunftModelSelector, builder) }
  lieferungsByNachKulturId(builder) { return this.__child(`lieferungsByNachKulturId`, lieferungModelSelector, builder) }
  lieferungsByNachKulturId_aggregate(builder) { return this.__child(`lieferungsByNachKulturId_aggregate`, lieferung_aggregateModelSelector, builder) }
  lieferungsByVonKulturId(builder) { return this.__child(`lieferungsByVonKulturId`, lieferungModelSelector, builder) }
  lieferungsByVonKulturId_aggregate(builder) { return this.__child(`lieferungsByVonKulturId_aggregate`, lieferung_aggregateModelSelector, builder) }
  sammelLieferungsByNachKulturId(builder) { return this.__child(`sammelLieferungsByNachKulturId`, sammel_lieferungModelSelector, builder) }
  sammelLieferungsByNachKulturId_aggregate(builder) { return this.__child(`sammelLieferungsByNachKulturId_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  teilkulturs(builder) { return this.__child(`teilkulturs`, teilkulturModelSelector, builder) }
  teilkulturs_aggregate(builder) { return this.__child(`teilkulturs_aggregate`, teilkultur_aggregateModelSelector, builder) }
  zaehlungs(builder) { return this.__child(`zaehlungs`, zaehlungModelSelector, builder) }
  zaehlungs_aggregate(builder) { return this.__child(`zaehlungs_aggregate`, zaehlung_aggregateModelSelector, builder) }
}
export function selectFromkultur_rev() {
  return new kultur_revModelSelector()
}

export const kultur_revModelPrimitives = selectFromkultur_rev()._deleted._depth._parent_rev._rev._revisions.aktiv.art_id.bemerkungen.changed.changed_by.erhaltungskultur.garten_id.herkunft_id.von_anzahl_individuen.zwischenlager
