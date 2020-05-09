/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AeArtModel } from "./AeArtModel"
import { AeArtModelSelector } from "./AeArtModel.base"
import { ArtFileAggregateModel } from "./ArtFileAggregateModel"
import { ArtFileAggregateModelSelector } from "./ArtFileAggregateModel.base"
import { ArtFileModel } from "./ArtFileModel"
import { ArtFileModelSelector } from "./ArtFileModel.base"
import { ArtQkChoosenAggregateModel } from "./ArtQkChoosenAggregateModel"
import { ArtQkChoosenAggregateModelSelector } from "./ArtQkChoosenAggregateModel.base"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"
import { ArtSumsAggregateModel } from "./ArtSumsAggregateModel"
import { ArtSumsAggregateModelSelector } from "./ArtSumsAggregateModel.base"
import { ArtSumsModel } from "./ArtSumsModel"
import { ArtSumsModelSelector } from "./ArtSumsModel.base"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"
import { GartenTeilzaehlungSumsAggregateModel } from "./GartenTeilzaehlungSumsAggregateModel"
import { GartenTeilzaehlungSumsAggregateModelSelector } from "./GartenTeilzaehlungSumsAggregateModel.base"
import { GartenTeilzaehlungSumsModel } from "./GartenTeilzaehlungSumsModel"
import { GartenTeilzaehlungSumsModelSelector } from "./GartenTeilzaehlungSumsModel.base"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { LieferungAggregateModel } from "./LieferungAggregateModel"
import { LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"
import { SammelLieferungAggregateModel } from "./SammelLieferungAggregateModel"
import { SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { SammlungAggregateModel } from "./SammlungAggregateModel"
import { SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * ArtBase
 * auto generated base class for the model ArtModel.
 *
 * columns and relationships of "art"
 */
export const ArtModelBase = ModelBase
  .named('Art')
  .props({
    __typename: types.optional(types.literal("art"), "art"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    art_ae_art: types.union(types.undefined, types.null, types.late(() => AeArtModel)),
    /** An array relationship */
    art_files: types.union(types.undefined, types.array(types.late(() => ArtFileModel))),
    /** An aggregated array relationship */
    art_files_aggregate: types.union(types.undefined, types.late(() => ArtFileAggregateModel)),
    /** An array relationship */
    art_qk_choosens: types.union(types.undefined, types.array(types.late(() => ArtQkChoosenModel))),
    /** An aggregated array relationship */
    art_qk_choosens_aggregate: types.union(types.undefined, types.late(() => ArtQkChoosenAggregateModel)),
    /** An array relationship */
    art_sums: types.union(types.undefined, types.array(types.late(() => ArtSumsModel))),
    /** An aggregated array relationship */
    art_sums_aggregate: types.union(types.undefined, types.late(() => ArtSumsAggregateModel)),
    /** An object relationship */
    av_art: types.union(types.undefined, types.null, types.late(() => AvArtModel)),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    garten_teilzaehlung_sums: types.union(types.undefined, types.array(types.late(() => GartenTeilzaehlungSumsModel))),
    /** An aggregated array relationship */
    garten_teilzaehlung_sums_aggregate: types.union(types.undefined, types.late(() => GartenTeilzaehlungSumsAggregateModel)),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    kulturs: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** An aggregated array relationship */
    kulturs_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    /** An array relationship */
    lieferungs: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** An aggregated array relationship */
    lieferungs_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    /** An array relationship */
    sammel_lieferungs: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
    /** An aggregated array relationship */
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => SammelLieferungAggregateModel)),
    /** An array relationship */
    sammlungs: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
    /** An aggregated array relationship */
    sammlungs_aggregate: types.union(types.undefined, types.late(() => SammlungAggregateModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ae_id() { return this.__attr(`ae_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get tsv() { return this.__attr(`tsv`) }
  art_ae_art(builder) { return this.__child(`art_ae_art`, AeArtModelSelector, builder) }
  art_files(builder) { return this.__child(`art_files`, ArtFileModelSelector, builder) }
  art_files_aggregate(builder) { return this.__child(`art_files_aggregate`, ArtFileAggregateModelSelector, builder) }
  art_qk_choosens(builder) { return this.__child(`art_qk_choosens`, ArtQkChoosenModelSelector, builder) }
  art_qk_choosens_aggregate(builder) { return this.__child(`art_qk_choosens_aggregate`, ArtQkChoosenAggregateModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, ArtSumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, ArtSumsAggregateModelSelector, builder) }
  av_art(builder) { return this.__child(`av_art`, AvArtModelSelector, builder) }
  garten_teilzaehlung_sums(builder) { return this.__child(`garten_teilzaehlung_sums`, GartenTeilzaehlungSumsModelSelector, builder) }
  garten_teilzaehlung_sums_aggregate(builder) { return this.__child(`garten_teilzaehlung_sums_aggregate`, GartenTeilzaehlungSumsAggregateModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, KulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, KulturAggregateModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, LieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, LieferungAggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, SammelLieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, SammelLieferungAggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, SammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, SammlungAggregateModelSelector, builder) }
}
export function selectFromArt() {
  return new ArtModelSelector()
}

export const artModelPrimitives = selectFromArt()._conflicts._depth._parent_rev._rev._revisions.ae_id.changed.changed_by.tsv
