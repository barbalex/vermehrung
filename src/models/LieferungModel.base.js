/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { LieferungFileAggregateModel } from "./LieferungFileAggregateModel"
import { LieferungFileAggregateModelSelector } from "./LieferungFileAggregateModel.base"
import { LieferungFileModel } from "./LieferungFileModel"
import { LieferungFileModelSelector } from "./LieferungFileModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * LieferungBase
 * auto generated base class for the model LieferungModel.
 *
 * columns and relationships of "lieferung"
 */
export const LieferungModelBase = ModelBase
  .named('Lieferung')
  .props({
    __typename: types.optional(types.literal("lieferung"), "lieferung"),
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
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    gramm_samen: types.union(types.undefined, types.null, types.integer),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kulturByNachKulturId: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** An object relationship */
    kulturByVonKulturId: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** An array relationship */
    lieferung_files: types.union(types.undefined, types.array(types.late(() => LieferungFileModel))),
    /** An aggregated array relationship */
    lieferung_files_aggregate: types.union(types.undefined, types.late(() => LieferungFileAggregateModel)),
    nach_ausgepflanzt: types.union(types.undefined, types.null, types.boolean),
    nach_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    sammel_lieferung: types.union(types.undefined, types.null, types.late(() => SammelLieferungModel)),
    sammel_lieferung_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    sammlung: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    von_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    von_sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungModelSelector extends QueryBuilder {
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
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get geplant() { return this.__attr(`geplant`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get id() { return this.__attr(`id`) }
  get nach_ausgepflanzt() { return this.__attr(`nach_ausgepflanzt`) }
  get nach_kultur_id() { return this.__attr(`nach_kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get sammel_lieferung_id() { return this.__attr(`sammel_lieferung_id`) }
  get tsv() { return this.__attr(`tsv`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get von_kultur_id() { return this.__attr(`von_kultur_id`) }
  get von_sammlung_id() { return this.__attr(`von_sammlung_id`) }
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  kulturByNachKulturId(builder) { return this.__child(`kulturByNachKulturId`, KulturModelSelector, builder) }
  kulturByVonKulturId(builder) { return this.__child(`kulturByVonKulturId`, KulturModelSelector, builder) }
  lieferung_files(builder) { return this.__child(`lieferung_files`, LieferungFileModelSelector, builder) }
  lieferung_files_aggregate(builder) { return this.__child(`lieferung_files_aggregate`, LieferungFileAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
  sammel_lieferung(builder) { return this.__child(`sammel_lieferung`, SammelLieferungModelSelector, builder) }
  sammlung(builder) { return this.__child(`sammlung`, SammlungModelSelector, builder) }
}
export function selectFromLieferung() {
  return new LieferungModelSelector()
}

export const lieferungModelPrimitives = selectFromLieferung()._conflicts._depth._parent_rev._rev._revisions.andere_menge.anzahl_auspflanzbereit.anzahl_pflanzen.art_id.bemerkungen.changed.changed_by.datum.geplant.gramm_samen.nach_ausgepflanzt.nach_kultur_id.person_id.sammel_lieferung_id.tsv.von_anzahl_individuen.von_kultur_id.von_sammlung_id
