/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevMinFieldsBase
 * auto generated base class for the model ArtRevMinFieldsModel.
 *
 * aggregate min on columns
 */
export const ArtRevMinFieldsModelBase = ModelBase
  .named('ArtRevMinFields')
  .props({
    __typename: types.optional(types.literal("art_rev_min_fields"), "art_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevMinFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get ae_id() { return this.__attr(`ae_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
}
export function selectFromArtRevMinFields() {
  return new ArtRevMinFieldsModelSelector()
}

export const artRevMinFieldsModelPrimitives = selectFromArtRevMinFields()._depth._parent_rev._rev.ae_id.changed.changed_by
