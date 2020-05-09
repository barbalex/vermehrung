/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenFileAggregateModel } from "./GartenFileAggregateModel"
import { GartenFileAggregateModelSelector } from "./GartenFileAggregateModel.base"
import { GartenFileModel } from "./GartenFileModel"
import { GartenFileModelSelector } from "./GartenFileModel.base"
import { GartenTeilzaehlungSumsAggregateModel } from "./GartenTeilzaehlungSumsAggregateModel"
import { GartenTeilzaehlungSumsAggregateModelSelector } from "./GartenTeilzaehlungSumsAggregateModel.base"
import { GartenTeilzaehlungSumsModel } from "./GartenTeilzaehlungSumsModel"
import { GartenTeilzaehlungSumsModelSelector } from "./GartenTeilzaehlungSumsModel.base"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"


/**
 * GartenBase
 * auto generated base class for the model GartenModel.
 *
 * columns and relationships of "garten"
 */
export const GartenModelBase = ModelBase
  .named('Garten')
  .props({
    __typename: types.optional(types.literal("garten"), "garten"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    garten_files: types.union(types.undefined, types.array(types.late(() => GartenFileModel))),
    /** An aggregated array relationship */
    garten_files_aggregate: types.union(types.undefined, types.late(() => GartenFileAggregateModel)),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    kulturs: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** An aggregated array relationship */
    kulturs_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    teilzaehlung_sums: types.union(types.undefined, types.array(types.late(() => GartenTeilzaehlungSumsModel))),
    /** An aggregated array relationship */
    teilzaehlung_sums_aggregate: types.union(types.undefined, types.late(() => GartenTeilzaehlungSumsAggregateModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
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
  get tsv() { return this.__attr(`tsv`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
  garten_files(builder) { return this.__child(`garten_files`, GartenFileModelSelector, builder) }
  garten_files_aggregate(builder) { return this.__child(`garten_files_aggregate`, GartenFileAggregateModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, KulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, KulturAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
  teilzaehlung_sums(builder) { return this.__child(`teilzaehlung_sums`, GartenTeilzaehlungSumsModelSelector, builder) }
  teilzaehlung_sums_aggregate(builder) { return this.__child(`teilzaehlung_sums_aggregate`, GartenTeilzaehlungSumsAggregateModelSelector, builder) }
}
export function selectFromGarten() {
  return new GartenModelSelector()
}

export const gartenModelPrimitives = selectFromGarten()._conflicts._depth._parent_rev._rev._revisions.aktiv.bemerkungen.changed.changed_by.geom_point.lv95_x.lv95_y.name.ort.person_id.plz.strasse.tsv.wgs84_lat.wgs84_long
