/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonFileMaxFieldsBase
 * auto generated base class for the model PersonFileMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const PersonFileMaxFieldsModelBase = ModelBase
  .named('PersonFileMaxFields')
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

export class PersonFileMaxFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromPersonFileMaxFields() {
  return new PersonFileMaxFieldsModelSelector()
}

export const personFileMaxFieldsModelPrimitives = selectFromPersonFileMaxFields().beschreibung.file_id.file_mime_type.name.person_id
