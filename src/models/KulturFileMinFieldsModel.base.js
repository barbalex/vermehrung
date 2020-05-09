/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturFileMinFieldsBase
 * auto generated base class for the model KulturFileMinFieldsModel.
 *
 * aggregate min on columns
 */
export const KulturFileMinFieldsModelBase = ModelBase
  .named('KulturFileMinFields')
  .props({
    __typename: types.optional(types.literal("kultur_file_min_fields"), "kultur_file_min_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturFileMinFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromKulturFileMinFields() {
  return new KulturFileMinFieldsModelSelector()
}

export const kulturFileMinFieldsModelPrimitives = selectFromKulturFileMinFields().beschreibung.file_id.file_mime_type.kultur_id.name
