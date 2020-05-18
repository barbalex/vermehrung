/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * herkunft_rev_min_fieldsBase
 * auto generated base class for the model herkunft_rev_min_fieldsModel.
 */
export const herkunft_rev_min_fieldsModelBase = ModelBase
  .named('herkunft_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_min_fields"), "herkunft_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kanton: types.union(types.undefined, types.null, types.string),
    land: types.union(types.undefined, types.null, types.string),
    lokalname: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get gemeinde() { return this.__attr(`gemeinde`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get kanton() { return this.__attr(`kanton`) }
  get land() { return this.__attr(`land`) }
  get lokalname() { return this.__attr(`lokalname`) }
  get nr() { return this.__attr(`nr`) }
}
export function selectFromherkunft_rev_min_fields() {
  return new herkunft_rev_min_fieldsModelSelector()
}

export const herkunft_rev_min_fieldsModelPrimitives = selectFromherkunft_rev_min_fields()._depth._parent_rev._rev.bemerkungen.changed.changed_by.gemeinde.herkunft_id.kanton.land.lokalname.nr
