/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"
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
 * ArtRevBase
 * auto generated base class for the model ArtRevModel.
 *
 * columns and relationships of "art_rev"
 */
export const ArtRevModelBase = ModelBase
  .named('ArtRev')
  .props({
    __typename: types.optional(types.literal("art_rev"), "art_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    av_art: types.union(types.undefined, types.null, types.late(() => AvArtModel)),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
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
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ae_id() { return this.__attr(`ae_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  av_art(builder) { return this.__child(`av_art`, AvArtModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, KulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, KulturAggregateModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, LieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, LieferungAggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, SammelLieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, SammelLieferungAggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, SammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, SammlungAggregateModelSelector, builder) }
}
export function selectFromArtRev() {
  return new ArtRevModelSelector()
}

export const artRevModelPrimitives = selectFromArtRev()._deleted._depth._parent_rev._rev._revisions.ae_id.changed.changed_by
