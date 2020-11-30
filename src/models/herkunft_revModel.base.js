/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"


/**
 * herkunft_revBase
 * auto generated base class for the model herkunft_revModel.
 */
export const herkunft_revModelBase = ModelBase
  .named('herkunft_rev')
  .props({
    __typename: types.optional(types.literal("herkunft_rev"), "herkunft_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    herkunft_id: types.union(types.undefined, types.frozen()),
    id: types.identifier,
    kanton: types.union(types.undefined, types.null, types.string),
    kulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    kulturs_aggregate: types.union(types.undefined, types.frozen()),
    land: types.union(types.undefined, types.null, types.string),
    lokalname: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
    sammlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlungs_aggregate: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get gemeinde() { return this.__attr(`gemeinde`) }
  get geom_point() { return this.__attr(`geom_point`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get kanton() { return this.__attr(`kanton`) }
  get land() { return this.__attr(`land`) }
  get lokalname() { return this.__attr(`lokalname`) }
  get nr() { return this.__attr(`nr`) }
  kulturs(builder) { return this.__child(`kulturs`, kulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, kultur_aggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, sammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, sammlung_aggregateModelSelector, builder) }
}
export function selectFromherkunft_rev() {
  return new herkunft_revModelSelector()
}

export const herkunft_revModelPrimitives = selectFromherkunft_rev()._deleted._depth._parent_rev._rev._rev_at._revisions.bemerkungen.changed.changed_by.gemeinde.geom_point.herkunft_id.kanton.land.lokalname.nr
