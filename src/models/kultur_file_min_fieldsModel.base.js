/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_file_min_fieldsBase
 * auto generated base class for the model kultur_file_min_fieldsModel.
 */
export const kultur_file_min_fieldsModelBase = ModelBase
  .named('kultur_file_min_fields')
  .props({
    __typename: types.optional(types.literal("kultur_file_min_fields"), "kultur_file_min_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_file_min_fieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromkultur_file_min_fields() {
  return new kultur_file_min_fieldsModelSelector()
}

export const kultur_file_min_fieldsModelPrimitives = selectFromkultur_file_min_fields().beschreibung.changed.file_id.file_mime_type.kultur_id.name
