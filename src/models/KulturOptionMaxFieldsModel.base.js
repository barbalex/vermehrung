/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionMaxFieldsBase
 * auto generated base class for the model KulturOptionMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const KulturOptionMaxFieldsModelBase = ModelBase
  .named('KulturOptionMaxFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_max_fields"), "kultur_option_max_fields"),
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

export class KulturOptionMaxFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
}
export function selectFromKulturOptionMaxFields() {
  return new KulturOptionMaxFieldsModelSelector()
}

export const kulturOptionMaxFieldsModelPrimitives = selectFromKulturOptionMaxFields()._depth._parent_rev._rev.kultur_id
