/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_file_max_fieldsBase
 * auto generated base class for the model person_file_max_fieldsModel.
 *
 * aggregate max on columns
 */
export const person_file_max_fieldsModelBase = ModelBase
  .named('person_file_max_fields')
  .props({
    __typename: types.optional(types.literal("person_file_max_fields"), "person_file_max_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_file_max_fieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromperson_file_max_fields() {
  return new person_file_max_fieldsModelSelector()
}

export const person_file_max_fieldsModelPrimitives = selectFromperson_file_max_fields().beschreibung.file_id.file_mime_type.name.person_id
