/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftFileAggregateModel } from "./HerkunftFileAggregateModel"
import { HerkunftFileAggregateModelSelector } from "./HerkunftFileAggregateModel.base"
import { HerkunftFileModel } from "./HerkunftFileModel"
import { HerkunftFileModelSelector } from "./HerkunftFileModel.base"
import { HerkunftSumsAggregateModel } from "./HerkunftSumsAggregateModel"
import { HerkunftSumsAggregateModelSelector } from "./HerkunftSumsAggregateModel.base"
import { HerkunftSumsModel } from "./HerkunftSumsModel"
import { HerkunftSumsModelSelector } from "./HerkunftSumsModel.base"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { SammlungAggregateModel } from "./SammlungAggregateModel"
import { SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * HerkunftBase
 * auto generated base class for the model HerkunftModel.
 *
 * columns and relationships of "herkunft"
 */
export const HerkunftModelBase = ModelBase
  .named('Herkunft')
  .props({
    __typename: types.optional(types.literal("herkunft"), "herkunft"),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    /** An array relationship */
    herkunft_files: types.union(types.undefined, types.array(types.late(() => HerkunftFileModel))),
    /** An aggregated array relationship */
    herkunft_files_aggregate: types.union(types.undefined, types.late(() => HerkunftFileAggregateModel)),
    /** An array relationship */
    herkunft_sums: types.union(types.undefined, types.array(types.late(() => HerkunftSumsModel))),
    /** An aggregated array relationship */
    herkunft_sums_aggregate: types.union(types.undefined, types.late(() => HerkunftSumsAggregateModel)),
    id: types.union(types.undefined, types.frozen()),
    kanton: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    kulturs: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** An aggregated array relationship */
    kulturs_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    land: types.union(types.undefined, types.null, types.string),
    lokalname: types.union(types.undefined, types.null, types.string),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    nr: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    sammlungs: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
    /** An aggregated array relationship */
    sammlungs_aggregate: types.union(types.undefined, types.late(() => SammlungAggregateModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftModelSelector extends QueryBuilder {
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get gemeinde() { return this.__attr(`gemeinde`) }
  get geom_point() { return this.__attr(`geom_point`) }
  get id() { return this.__attr(`id`) }
  get kanton() { return this.__attr(`kanton`) }
  get land() { return this.__attr(`land`) }
  get lokalname() { return this.__attr(`lokalname`) }
  get lv95_x() { return this.__attr(`lv95_x`) }
  get lv95_y() { return this.__attr(`lv95_y`) }
  get nr() { return this.__attr(`nr`) }
  get tsv() { return this.__attr(`tsv`) }
  get wgs84_lat() { return this.__attr(`wgs84_lat`) }
  get wgs84_long() { return this.__attr(`wgs84_long`) }
  herkunft_files(builder) { return this.__child(`herkunft_files`, HerkunftFileModelSelector, builder) }
  herkunft_files_aggregate(builder) { return this.__child(`herkunft_files_aggregate`, HerkunftFileAggregateModelSelector, builder) }
  herkunft_sums(builder) { return this.__child(`herkunft_sums`, HerkunftSumsModelSelector, builder) }
  herkunft_sums_aggregate(builder) { return this.__child(`herkunft_sums_aggregate`, HerkunftSumsAggregateModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, KulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, KulturAggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, SammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, SammlungAggregateModelSelector, builder) }
}
export function selectFromHerkunft() {
  return new HerkunftModelSelector()
}

export const herkunftModelPrimitives = selectFromHerkunft().bemerkungen.changed.changed_by.gemeinde.geom_point.kanton.land.lokalname.lv95_x.lv95_y.nr.tsv.wgs84_lat.wgs84_long
