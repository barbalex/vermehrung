/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelSelector } from "./art_fileModel.base"
import { art_file_aggregateModel } from "./art_file_aggregateModel"
import { art_file_aggregateModelSelector } from "./art_file_aggregateModel.base"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qk_choosen_aggregateModel } from "./art_qk_choosen_aggregateModel"
import { art_qk_choosen_aggregateModelSelector } from "./art_qk_choosen_aggregateModel.base"
import { art_sumsModel } from "./art_sumsModel"
import { art_sumsModelSelector } from "./art_sumsModel.base"
import { art_sums_aggregateModel } from "./art_sums_aggregateModel"
import { art_sums_aggregateModelSelector } from "./art_sums_aggregateModel.base"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"
import { garten_teilzaehlung_sumsModel } from "./garten_teilzaehlung_sumsModel"
import { garten_teilzaehlung_sumsModelSelector } from "./garten_teilzaehlung_sumsModel.base"
import { garten_teilzaehlung_sums_aggregateModel } from "./garten_teilzaehlung_sums_aggregateModel"
import { garten_teilzaehlung_sums_aggregateModelSelector } from "./garten_teilzaehlung_sums_aggregateModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_aggregateModel } from "./kultur_aggregateModel"
import { kultur_aggregateModelSelector } from "./kultur_aggregateModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_aggregateModel } from "./lieferung_aggregateModel"
import { lieferung_aggregateModelSelector } from "./lieferung_aggregateModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_aggregateModel } from "./sammel_lieferung_aggregateModel"
import { sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_aggregateModel } from "./sammlung_aggregateModel"
import { sammlung_aggregateModelSelector } from "./sammlung_aggregateModel.base"


/**
 * artBase
 * auto generated base class for the model artModel.
 *
 * columns and relationships of "art"
 */
export const artModelBase = ModelBase
  .named('art')
  .props({
    __typename: types.optional(types.literal("art"), "art"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    art_ae_art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => ae_artModel))),
    /** An array relationship */
    art_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_fileModel)))),
    /** An aggregated array relationship */
    art_files_aggregate: types.union(types.undefined, types.late(() => art_file_aggregateModel)),
    /** An array relationship */
    art_qk_choosens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosenModel)))),
    /** An aggregated array relationship */
    art_qk_choosens_aggregate: types.union(types.undefined, types.late(() => art_qk_choosen_aggregateModel)),
    /** An array relationship */
    art_sums: types.union(types.undefined, types.array(types.late(() => art_sumsModel))),
    /** An aggregated array relationship */
    art_sums_aggregate: types.union(types.undefined, types.late(() => art_sums_aggregateModel)),
    /** An object relationship */
    av_art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => av_artModel))),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    garten_teilzaehlung_sums: types.union(types.undefined, types.array(types.late(() => garten_teilzaehlung_sumsModel))),
    /** An aggregated array relationship */
    garten_teilzaehlung_sums_aggregate: types.union(types.undefined, types.late(() => garten_teilzaehlung_sums_aggregateModel)),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    kulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    /** An aggregated array relationship */
    kulturs_aggregate: types.union(types.undefined, types.late(() => kultur_aggregateModel)),
    /** An array relationship */
    lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    /** An aggregated array relationship */
    lieferungs_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    /** An array relationship */
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    /** An aggregated array relationship */
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    /** An array relationship */
    sammlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    /** An aggregated array relationship */
    sammlungs_aggregate: types.union(types.undefined, types.late(() => sammlung_aggregateModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class artModelSelector extends QueryBuilder {
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
  art_ae_art(builder) { return this.__child(`art_ae_art`, ae_artModelSelector, builder) }
  art_files(builder) { return this.__child(`art_files`, art_fileModelSelector, builder) }
  art_files_aggregate(builder) { return this.__child(`art_files_aggregate`, art_file_aggregateModelSelector, builder) }
  art_qk_choosens(builder) { return this.__child(`art_qk_choosens`, art_qk_choosenModelSelector, builder) }
  art_qk_choosens_aggregate(builder) { return this.__child(`art_qk_choosens_aggregate`, art_qk_choosen_aggregateModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, art_sumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, art_sums_aggregateModelSelector, builder) }
  av_art(builder) { return this.__child(`av_art`, av_artModelSelector, builder) }
  garten_teilzaehlung_sums(builder) { return this.__child(`garten_teilzaehlung_sums`, garten_teilzaehlung_sumsModelSelector, builder) }
  garten_teilzaehlung_sums_aggregate(builder) { return this.__child(`garten_teilzaehlung_sums_aggregate`, garten_teilzaehlung_sums_aggregateModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, kulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, kultur_aggregateModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, lieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, lieferung_aggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, sammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, sammlung_aggregateModelSelector, builder) }
}
export function selectFromart() {
  return new artModelSelector()
}

export const artModelPrimitives = selectFromart()._conflicts._depth._parent_rev._rev._revisions.ae_id.changed.changed_by.tsv
