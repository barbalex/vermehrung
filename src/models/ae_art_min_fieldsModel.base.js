/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ae_art_min_fieldsBase
 * auto generated base class for the model ae_art_min_fieldsModel.
 */
export const ae_art_min_fieldsModelBase = ModelBase
  .named('ae_art_min_fields')
  .props({
    __typename: types.optional(types.literal("ae_art_min_fields"), "ae_art_min_fields"),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
    name_deutsch: types.union(types.undefined, types.null, types.string),
    name_latein: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_art_min_fieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get name_deutsch() { return this.__attr(`name_deutsch`) }
  get name_latein() { return this.__attr(`name_latein`) }
}
export function selectFromae_art_min_fields() {
  return new ae_art_min_fieldsModelSelector()
}

export const ae_art_min_fieldsModelPrimitives = selectFromae_art_min_fields().name.name_deutsch.name_latein
