/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_file_min_fieldsBase
 * auto generated base class for the model art_file_min_fieldsModel.
 */
export const art_file_min_fieldsModelBase = ModelBase
  .named('art_file_min_fields')
  .props({
    __typename: types.optional(types.literal("art_file_min_fields"), "art_file_min_fields"),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_file_min_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
  get art_id() { return this.__attr(`art_id`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromart_file_min_fields() {
  return new art_file_min_fieldsModelSelector()
}

export const art_file_min_fieldsModelPrimitives = selectFromart_file_min_fields()._rev_at.art_id.beschreibung.changed.file_id.file_mime_type.name
