/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_file_max_fieldsBase
 * auto generated base class for the model garten_file_max_fieldsModel.
 *
 * aggregate max on columns
 */
export const garten_file_max_fieldsModelBase = ModelBase
  .named('garten_file_max_fields')
  .props({
    __typename: types.optional(types.literal("garten_file_max_fields"), "garten_file_max_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_file_max_fieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromgarten_file_max_fields() {
  return new garten_file_max_fieldsModelSelector()
}

export const garten_file_max_fieldsModelPrimitives = selectFromgarten_file_max_fields().beschreibung.file_id.file_mime_type.garten_id.name
