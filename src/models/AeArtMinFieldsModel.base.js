/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * AeArtMinFieldsBase
 * auto generated base class for the model AeArtMinFieldsModel.
 *
 * aggregate min on columns
 */
export const AeArtMinFieldsModelBase = ModelBase
  .named('AeArtMinFields')
  .props({
    __typename: types.optional(types.literal("ae_art_min_fields"), "ae_art_min_fields"),
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

export class AeArtMinFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get name_deutsch() { return this.__attr(`name_deutsch`) }
  get name_latein() { return this.__attr(`name_latein`) }
}
export function selectFromAeArtMinFields() {
  return new AeArtMinFieldsModelSelector()
}

export const aeArtMinFieldsModelPrimitives = selectFromAeArtMinFields().name.name_deutsch.name_latein
