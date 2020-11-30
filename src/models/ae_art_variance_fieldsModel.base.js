/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ae_art_variance_fieldsBase
 * auto generated base class for the model ae_art_variance_fieldsModel.
 */
export const ae_art_variance_fieldsModelBase = ModelBase
  .named('ae_art_variance_fields')
  .props({
    __typename: types.optional(types.literal("ae_art_variance_fields"), "ae_art_variance_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_art_variance_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromae_art_variance_fields() {
  return new ae_art_variance_fieldsModelSelector()
}

export const ae_art_variance_fieldsModelPrimitives = selectFromae_art_variance_fields()._rev_at
