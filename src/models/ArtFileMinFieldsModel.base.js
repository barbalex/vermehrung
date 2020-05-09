/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtFileMinFieldsBase
 * auto generated base class for the model ArtFileMinFieldsModel.
 *
 * aggregate min on columns
 */
export const ArtFileMinFieldsModelBase = ModelBase
  .named('ArtFileMinFields')
  .props({
    __typename: types.optional(types.literal("art_file_min_fields"), "art_file_min_fields"),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtFileMinFieldsModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromArtFileMinFields() {
  return new ArtFileMinFieldsModelSelector()
}

export const artFileMinFieldsModelPrimitives = selectFromArtFileMinFields().art_id.beschreibung.file_id.file_mime_type.name
