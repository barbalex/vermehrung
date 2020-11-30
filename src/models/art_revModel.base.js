/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"
import { avModel } from "./avModel"
import { avModelSelector } from "./avModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"


/**
 * art_revBase
 * auto generated base class for the model art_revModel.
 */
export const art_revModelBase = ModelBase
  .named('art_rev')
  .props({
    __typename: types.optional(types.literal("art_rev"), "art_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    art_id: types.union(types.undefined, types.frozen()),
    art_rev_ae_art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => ae_artModel))),
    av: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => avModel))),
    avs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => avModel)))),
    avs_aggregate: types.union(types.undefined, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    kulturs_aggregate: types.union(types.undefined, types.frozen()),
    lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferungs_aggregate: types.union(types.undefined, types.frozen()),
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammel_lieferungs_aggregate: types.union(types.undefined, types.frozen()),
    sammlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlungs_aggregate: types.union(types.undefined, types.frozen()),
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
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get ae_id() { return this.__attr(`ae_id`) }
  get art_id() { return this.__attr(`art_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  art_rev_ae_art(builder) { return this.__child(`art_rev_ae_art`, ae_artModelSelector, builder) }
  av(builder) { return this.__child(`av`, avModelSelector, builder) }
  avs(builder) { return this.__child(`avs`, avModelSelector, builder) }
  avs_aggregate(builder) { return this.__child(`avs_aggregate`, av_aggregateModelSelector, builder) }
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

export const art_revModelPrimitives = selectFromart_rev()._deleted._depth._parent_rev._rev._rev_at._revisions.ae_id.art_id.changed.changed_by
