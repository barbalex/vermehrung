/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_qk_rev_min_fieldsBase
 * auto generated base class for the model kultur_qk_rev_min_fieldsModel.
 */
export const kultur_qk_rev_min_fieldsModelBase = ModelBase
  .named('kultur_qk_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_rev_min_fields"), "kultur_qk_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kultur_qk_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get kultur_qk_id() { return this.__attr(`kultur_qk_id`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromkultur_qk_rev_min_fields() {
  return new kultur_qk_rev_min_fieldsModelSelector()
}

export const kultur_qk_rev_min_fieldsModelPrimitives = selectFromkultur_qk_rev_min_fields()._depth._parent_rev._rev.beschreibung.changed.changed_by.kultur_qk_id.name.sort.titel
