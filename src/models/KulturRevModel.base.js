/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { EventAggregateModel } from "./EventAggregateModel"
import { EventAggregateModelSelector } from "./EventAggregateModel.base"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"
import { LieferungAggregateModel } from "./LieferungAggregateModel"
import { LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"
import { SammelLieferungAggregateModel } from "./SammelLieferungAggregateModel"
import { SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { TeilkulturAggregateModel } from "./TeilkulturAggregateModel"
import { TeilkulturAggregateModelSelector } from "./TeilkulturAggregateModel.base"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"
import { ZaehlungAggregateModel } from "./ZaehlungAggregateModel"
import { ZaehlungAggregateModelSelector } from "./ZaehlungAggregateModel.base"
import { ZaehlungModel } from "./ZaehlungModel"
import { ZaehlungModelSelector } from "./ZaehlungModel.base"


/**
 * KulturRevBase
 * auto generated base class for the model KulturRevModel.
 *
 * columns and relationships of "kultur_rev"
 */
export const KulturRevModelBase = ModelBase
  .named('KulturRev')
  .props({
    __typename: types.optional(types.literal("kultur_rev"), "kultur_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    /** An object relationship */
    art: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    erhaltungskultur: types.union(types.undefined, types.null, types.boolean),
    /** An array relationship */
    events: types.union(types.undefined, types.array(types.late(() => EventModel))),
    /** An aggregated array relationship */
    events_aggregate: types.union(types.undefined, types.late(() => EventAggregateModel)),
    /** An object relationship */
    garten: types.union(types.undefined, types.null, types.late(() => GartenModel)),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    herkunft: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    lieferungsByNachKulturId: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** An aggregated array relationship */
    lieferungsByNachKulturId_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    /** An array relationship */
    lieferungsByVonKulturId: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** An aggregated array relationship */
    lieferungsByVonKulturId_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    /** An array relationship */
    sammelLieferungsByNachKulturId: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
    /** An aggregated array relationship */
    sammelLieferungsByNachKulturId_aggregate: types.union(types.undefined, types.late(() => SammelLieferungAggregateModel)),
    /** An array relationship */
    sammel_lieferungs: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
    /** An aggregated array relationship */
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => SammelLieferungAggregateModel)),
    /** An array relationship */
    teilkulturs: types.union(types.undefined, types.array(types.late(() => TeilkulturModel))),
    /** An aggregated array relationship */
    teilkulturs_aggregate: types.union(types.undefined, types.late(() => TeilkulturAggregateModel)),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    /** An array relationship */
    zaehlungs: types.union(types.undefined, types.array(types.late(() => ZaehlungModel))),
    /** An aggregated array relationship */
    zaehlungs_aggregate: types.union(types.undefined, types.late(() => ZaehlungAggregateModel)),
    zwischenlager: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevModelSelector extends QueryBuilder {
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
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  events(builder) { return this.__child(`events`, EventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, EventAggregateModelSelector, builder) }
  garten(builder) { return this.__child(`garten`, GartenModelSelector, builder) }
  herkunft(builder) { return this.__child(`herkunft`, HerkunftModelSelector, builder) }
  lieferungsByNachKulturId(builder) { return this.__child(`lieferungsByNachKulturId`, LieferungModelSelector, builder) }
  lieferungsByNachKulturId_aggregate(builder) { return this.__child(`lieferungsByNachKulturId_aggregate`, LieferungAggregateModelSelector, builder) }
  lieferungsByVonKulturId(builder) { return this.__child(`lieferungsByVonKulturId`, LieferungModelSelector, builder) }
  lieferungsByVonKulturId_aggregate(builder) { return this.__child(`lieferungsByVonKulturId_aggregate`, LieferungAggregateModelSelector, builder) }
  sammelLieferungsByNachKulturId(builder) { return this.__child(`sammelLieferungsByNachKulturId`, SammelLieferungModelSelector, builder) }
  sammelLieferungsByNachKulturId_aggregate(builder) { return this.__child(`sammelLieferungsByNachKulturId_aggregate`, SammelLieferungAggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, SammelLieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, SammelLieferungAggregateModelSelector, builder) }
  teilkulturs(builder) { return this.__child(`teilkulturs`, TeilkulturModelSelector, builder) }
  teilkulturs_aggregate(builder) { return this.__child(`teilkulturs_aggregate`, TeilkulturAggregateModelSelector, builder) }
  zaehlungs(builder) { return this.__child(`zaehlungs`, ZaehlungModelSelector, builder) }
  zaehlungs_aggregate(builder) { return this.__child(`zaehlungs_aggregate`, ZaehlungAggregateModelSelector, builder) }
}
export function selectFromKulturRev() {
  return new KulturRevModelSelector()
}

export const kulturRevModelPrimitives = selectFromKulturRev()._deleted._depth._parent_rev._rev._revisions.aktiv.art_id.bemerkungen.changed.changed_by.erhaltungskultur.garten_id.herkunft_id.von_anzahl_individuen.zwischenlager
