/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SammlungFileMinFieldsBase
 * auto generated base class for the model SammlungFileMinFieldsModel.
 *
 * aggregate min on columns
 */
export const SammlungFileMinFieldsModelBase = ModelBase
  .named('SammlungFileMinFields')
  .props({
    __typename: types.optional(types.literal("sammlung_file_min_fields"), "sammlung_file_min_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungFileMinFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sammlung_id() { return this.__attr(`sammlung_id`) }
}
export function selectFromSammlungFileMinFields() {
  return new SammlungFileMinFieldsModelSelector()
}

export const sammlungFileMinFieldsModelPrimitives = selectFromSammlungFileMinFields().beschreibung.file_id.file_mime_type.name.sammlung_id
