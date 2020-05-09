/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ae_art_max_fieldsBase
 * auto generated base class for the model ae_art_max_fieldsModel.
 *
 * aggregate max on columns
 */
export const ae_art_max_fieldsModelBase = ModelBase
  .named('ae_art_max_fields')
  .props({
    __typename: types.optional(types.literal("ae_art_max_fields"), "ae_art_max_fields"),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    name_deutsch: types.union(types.undefined, types.null, types.string),
    name_latein: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_art_max_fieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get name_deutsch() { return this.__attr(`name_deutsch`) }
  get name_latein() { return this.__attr(`name_latein`) }
}
export function selectFromae_art_max_fields() {
  return new ae_art_max_fieldsModelSelector()
}

export const ae_art_max_fieldsModelPrimitives = selectFromae_art_max_fields().name.name_deutsch.name_latein
