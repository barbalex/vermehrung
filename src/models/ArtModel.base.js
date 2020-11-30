/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelSelector } from "./art_fileModel.base"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { avModel } from "./avModel"
import { avModelSelector } from "./avModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelSelector } from "./kultur_revModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelSelector } from "./lieferung_revModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelSelector } from "./sammlung_revModel.base"


/**
 * artBase
 * auto generated base class for the model artModel.
 */
export const artModelBase = ModelBase
  .named('art')
  .props({
    __typename: types.optional(types.literal("art"), "art"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    art_ae_art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => ae_artModel))),
    art_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_fileModel)))),
    art_files_aggregate: types.union(types.undefined, types.frozen()),
    art_qk_choosens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosenModel)))),
    art_qk_choosens_aggregate: types.union(types.undefined, types.frozen()),
    avs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => avModel)))),
    avs_aggregate: types.union(types.undefined, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kultur_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_revModel)))),
    kultur_revs_aggregate: types.union(types.undefined, types.frozen()),
    kulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    kulturs_aggregate: types.union(types.undefined, types.frozen()),
    lieferung_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_revModel)))),
    lieferung_revs_aggregate: types.union(types.undefined, types.frozen()),
    lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferungs_aggregate: types.union(types.undefined, types.frozen()),
    sammel_lieferung_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferung_revModel)))),
    sammel_lieferung_revs_aggregate: types.union(types.undefined, types.frozen()),
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammel_lieferungs_aggregate: types.union(types.undefined, types.frozen()),
    sammlung_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_revModel)))),
    sammlung_revs_aggregate: types.union(types.undefined, types.frozen()),
    sammlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlungs_aggregate: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class artModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ae_id() { return this.__attr(`ae_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  art_ae_art(builder) { return this.__child(`art_ae_art`, ae_artModelSelector, builder) }
  art_files(builder) { return this.__child(`art_files`, art_fileModelSelector, builder) }
  art_files_aggregate(builder) { return this.__child(`art_files_aggregate`, art_file_aggregateModelSelector, builder) }
  art_qk_choosens(builder) { return this.__child(`art_qk_choosens`, art_qk_choosenModelSelector, builder) }
  art_qk_choosens_aggregate(builder) { return this.__child(`art_qk_choosens_aggregate`, art_qk_choosen_aggregateModelSelector, builder) }
  avs(builder) { return this.__child(`avs`, avModelSelector, builder) }
  avs_aggregate(builder) { return this.__child(`avs_aggregate`, av_aggregateModelSelector, builder) }
  kultur_revs(builder) { return this.__child(`kultur_revs`, kultur_revModelSelector, builder) }
  kultur_revs_aggregate(builder) { return this.__child(`kultur_revs_aggregate`, kultur_rev_aggregateModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, kulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, kultur_aggregateModelSelector, builder) }
  lieferung_revs(builder) { return this.__child(`lieferung_revs`, lieferung_revModelSelector, builder) }
  lieferung_revs_aggregate(builder) { return this.__child(`lieferung_revs_aggregate`, lieferung_rev_aggregateModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, lieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, lieferung_aggregateModelSelector, builder) }
  sammel_lieferung_revs(builder) { return this.__child(`sammel_lieferung_revs`, sammel_lieferung_revModelSelector, builder) }
  sammel_lieferung_revs_aggregate(builder) { return this.__child(`sammel_lieferung_revs_aggregate`, sammel_lieferung_rev_aggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammlung_revs(builder) { return this.__child(`sammlung_revs`, sammlung_revModelSelector, builder) }
  sammlung_revs_aggregate(builder) { return this.__child(`sammlung_revs_aggregate`, sammlung_rev_aggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, sammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, sammlung_aggregateModelSelector, builder) }
}
export function selectFromart() {
  return new artModelSelector()
}

export const artModelPrimitives = selectFromart()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.ae_id.changed.changed_by
