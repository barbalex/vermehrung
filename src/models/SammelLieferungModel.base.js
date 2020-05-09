/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { LieferungAggregateModel } from "./LieferungAggregateModel"
import { LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * SammelLieferungBase
 * auto generated base class for the model SammelLieferungModel.
 *
 * columns and relationships of "sammel_lieferung"
 */
export const SammelLieferungModelBase = ModelBase
  .named('SammelLieferung')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung"), "sammel_lieferung"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    /** An object relationship */
    art: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    gramm_samen: types.union(types.undefined, types.null, types.integer),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kulturByNachKulturId: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** An object relationship */
    kulturByVonKulturId: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** An array relationship */
    lieferungs: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** An aggregated array relationship */
    lieferungs_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    nach_ausgepflanzt: types.union(types.undefined, types.null, types.boolean),
    nach_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    sammlung: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    von_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    von_sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get datum() { return this.__attr(`datum`) }
  get geplant() { return this.__attr(`geplant`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get id() { return this.__attr(`id`) }
  get nach_ausgepflanzt() { return this.__attr(`nach_ausgepflanzt`) }
  get nach_kultur_id() { return this.__attr(`nach_kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get von_kultur_id() { return this.__attr(`von_kultur_id`) }
  get von_sammlung_id() { return this.__attr(`von_sammlung_id`) }
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  kulturByNachKulturId(builder) { return this.__child(`kulturByNachKulturId`, KulturModelSelector, builder) }
  kulturByVonKulturId(builder) { return this.__child(`kulturByVonKulturId`, KulturModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, LieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, LieferungAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
  sammlung(builder) { return this.__child(`sammlung`, SammlungModelSelector, builder) }
}
export function selectFromSammelLieferung() {
  return new SammelLieferungModelSelector()
}

export const sammelLieferungModelPrimitives = selectFromSammelLieferung()._conflicts._depth._parent_rev._rev._revisions.andere_menge.anzahl_auspflanzbereit.anzahl_pflanzen.art_id.bemerkungen.datum.geplant.gramm_samen.nach_ausgepflanzt.nach_kultur_id.person_id.von_anzahl_individuen.von_kultur_id.von_sammlung_id
