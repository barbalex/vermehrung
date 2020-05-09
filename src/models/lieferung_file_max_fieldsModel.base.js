/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * lieferung_file_max_fieldsBase
 * auto generated base class for the model lieferung_file_max_fieldsModel.
 *
 * aggregate max on columns
 */
export const lieferung_file_max_fieldsModelBase = ModelBase
  .named('lieferung_file_max_fields')
  .props({
    __typename: types.optional(types.literal("lieferung_file_max_fields"), "lieferung_file_max_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    lieferung_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_file_max_fieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get lieferung_id() { return this.__attr(`lieferung_id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromlieferung_file_max_fields() {
  return new lieferung_file_max_fieldsModelSelector()
}

export const lieferung_file_max_fieldsModelPrimitives = selectFromlieferung_file_max_fields().beschreibung.file_id.file_mime_type.lieferung_id.name
