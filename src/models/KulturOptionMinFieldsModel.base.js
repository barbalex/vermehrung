/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionMinFieldsBase
 * auto generated base class for the model KulturOptionMinFieldsModel.
 *
 * aggregate min on columns
 */
export const KulturOptionMinFieldsModelBase = ModelBase
  .named('KulturOptionMinFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_min_fields"), "kultur_option_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionMinFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
}
export function selectFromKulturOptionMinFields() {
  return new KulturOptionMinFieldsModelSelector()
}

export const kulturOptionMinFieldsModelPrimitives = selectFromKulturOptionMinFields()._depth._parent_rev._rev.kultur_id
