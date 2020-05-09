/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"


/**
 * PersonFileBase
 * auto generated base class for the model PersonFileModel.
 *
 * columns and relationships of "person_file"
 */
export const PersonFileModelBase = ModelBase
  .named('PersonFile')
  .props({
    __typename: types.optional(types.literal("person_file"), "person_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonFileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get person_id() { return this.__attr(`person_id`) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
}
export function selectFromPersonFile() {
  return new PersonFileModelSelector()
}

export const personFileModelPrimitives = selectFromPersonFile().beschreibung.file_id.file_mime_type.name.person_id
