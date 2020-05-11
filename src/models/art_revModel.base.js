/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"
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
 * art_revBase
 * auto generated base class for the model art_revModel.
 *
 * columns and relationships of "art_rev"
 */
export const art_revModelBase = ModelBase
  .named('art_rev')
  .props({
    __typename: types.optional(types.literal("art_rev"), "art_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    av_art: types.union(types.undefined, types.null, types.late(() => av_artModel)),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
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
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ae_id() { return this.__attr(`ae_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  av_art(builder) { return this.__child(`av_art`, av_artModelSelector, builder) }
  kulturs(builder) { return this.__child(`kulturs`, kulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, kultur_aggregateModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, lieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, lieferung_aggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, sammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, sammlung_aggregateModelSelector, builder) }
}
export function selectFromart_rev() {
  return new art_revModelSelector()
}

export const art_revModelPrimitives = selectFromart_rev()._deleted._depth._parent_rev._rev._revisions.ae_id.changed.changed_by
