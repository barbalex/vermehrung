/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { SammlungAggregateModel } from "./SammlungAggregateModel"
import { SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * HerkunftRevBase
 * auto generated base class for the model HerkunftRevModel.
 *
 * columns and relationships of "herkunft_rev"
 */
export const HerkunftRevModelBase = ModelBase
  .named('HerkunftRev')
  .props({
    __typename: types.optional(types.literal("herkunft_rev"), "herkunft_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    kanton: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    kulturs: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** An aggregated array relationship */
    kulturs_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    land: types.union(types.undefined, types.null, types.string),
    lokalname: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
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

export class HerkunftRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get gemeinde() { return this.__attr(`gemeinde`) }
  get geom_point() { return this.__attr(`geom_point`) }
  get id() { return this.__attr(`id`) }
  get kanton() { return this.__attr(`kanton`) }
  get land() { return this.__attr(`land`) }
  get lokalname() { return this.__attr(`lokalname`) }
  get nr() { return this.__attr(`nr`) }
  kulturs(builder) { return this.__child(`kulturs`, KulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, KulturAggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, SammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, SammlungAggregateModelSelector, builder) }
}
export function selectFromHerkunftRev() {
  return new HerkunftRevModelSelector()
}

export const herkunftRevModelPrimitives = selectFromHerkunftRev()._deleted._depth._parent_rev._rev._revisions.bemerkungen.changed.changed_by.gemeinde.geom_point.kanton.land.lokalname.nr
