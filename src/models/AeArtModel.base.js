/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"


/**
 * AeArtBase
 * auto generated base class for the model AeArtModel.
 *
 * columns and relationships of "ae_art"
 */
export const AeArtModelBase = ModelBase
  .named('AeArt')
  .props({
    __typename: types.optional(types.literal("ae_art"), "ae_art"),
    /** An object relationship */
    ae_art_art: types.union(types.undefined, types.null, types.late(() => ArtModel)),
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

export class AeArtModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get name_deutsch() { return this.__attr(`name_deutsch`) }
  get name_latein() { return this.__attr(`name_latein`) }
  ae_art_art(builder) { return this.__child(`ae_art_art`, ArtModelSelector, builder) }
}
export function selectFromAeArt() {
  return new AeArtModelSelector()
}

export const aeArtModelPrimitives = selectFromAeArt().name.name_deutsch.name_latein
