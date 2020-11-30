/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_fileModel } from "./garten_fileModel"
import { garten_fileModelSelector } from "./garten_fileModel.base"
import { gvModel } from "./gvModel"
import { gvModelSelector } from "./gvModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelSelector } from "./kultur_revModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * gartenBase
 * auto generated base class for the model gartenModel.
 */
export const gartenModelBase = ModelBase
  .named('garten')
  .props({
    __typename: types.optional(types.literal("garten"), "garten"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    garten_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_fileModel)))),
    garten_files_aggregate: types.union(types.undefined, types.frozen()),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    gvs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gvModel)))),
    gvs_aggregate: types.union(types.undefined, types.frozen()),
    id: types.identifier,
    kultur_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_revModel)))),
    kultur_revs_aggregate: types.union(types.undefined, types.frozen()),
    kulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    kulturs_aggregate: types.union(types.undefined, types.frozen()),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    person: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gartenModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get aktiv() { return this.__attr(`aktiv`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get geom_point() { return this.__attr(`geom_point`) }
  get id() { return this.__attr(`id`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get name() { return this.__attr(`name`) }
  get ort() { return this.__attr(`ort`) }
  get person_id() { return this.__attr(`person_id`) }
  get plz() { return this.__attr(`plz`) }
  get strasse() { return this.__attr(`strasse`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
  garten_files(builder) { return this.__child(`garten_files`, garten_fileModelSelector, builder) }
  garten_files_aggregate(builder) { return this.__child(`garten_files_aggregate`, garten_file_aggregateModelSelector, builder) }
  gvs(builder) { return this.__child(`gvs`, gvModelSelector, builder) }
  gvs_aggregate(builder) { return this.__child(`gvs_aggregate`, gv_aggregateModelSelector, builder) }
  kultur_revs(builder) { return this.__child(`kultur_revs`, kultur_revModelSelector, builder) }
  kultur_revs_aggregate(builder) { return this.__child(`kultur_revs_aggregate`, kultur_rev_aggregateModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, kulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, kultur_aggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromgarten() {
  return new gartenModelSelector()
}

export const gartenModelPrimitives = selectFromgarten()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.aktiv.bemerkungen.changed.changed_by.geom_point.lv95_x.lv95_y.name.ort.person_id.plz.strasse.wgs84_lat.wgs84_long
