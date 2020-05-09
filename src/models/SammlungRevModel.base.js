/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"
import { LieferungAggregateModel } from "./LieferungAggregateModel"
import { LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { SammelLieferungAggregateModel } from "./SammelLieferungAggregateModel"
import { SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"


/**
 * SammlungRevBase
 * auto generated base class for the model SammlungRevModel.
 *
 * columns and relationships of "sammlung_rev"
 */
export const SammlungRevModelBase = ModelBase
  .named('SammlungRev')
  .props({
    __typename: types.optional(types.literal("sammlung_rev"), "sammlung_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    /** An object relationship */
    art: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    gramm_samen: types.union(types.undefined, types.null, types.integer),
    /** An object relationship */
    herkunft: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    lieferungs: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** An aggregated array relationship */
    lieferungs_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    nr: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    /** An array relationship */
    sammel_lieferungs: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
    /** An aggregated array relationship */
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => SammelLieferungAggregateModel)),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get geom_point() { return this.__attr(`geom_point`) }
  get geplant() { return this.__attr(`geplant`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get nr() { return this.__attr(`nr`) }
  get person_id() { return this.__attr(`person_id`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  herkunft(builder) { return this.__child(`herkunft`, HerkunftModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, LieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, LieferungAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, SammelLieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, SammelLieferungAggregateModelSelector, builder) }
}
export function selectFromSammlungRev() {
  return new SammlungRevModelSelector()
}

export const sammlungRevModelPrimitives = selectFromSammlungRev()._deleted._depth._parent_rev._rev._revisions.andere_menge.anzahl_pflanzen.art_id.bemerkungen.changed.changed_by.datum.geom_point.geplant.gramm_samen.herkunft_id.nr.person_id.von_anzahl_individuen
