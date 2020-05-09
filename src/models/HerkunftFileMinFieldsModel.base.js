/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * HerkunftFileMinFieldsBase
 * auto generated base class for the model HerkunftFileMinFieldsModel.
 *
 * aggregate min on columns
 */
export const HerkunftFileMinFieldsModelBase = ModelBase
  .named('HerkunftFileMinFields')
  .props({
    __typename: types.optional(types.literal("herkunft_file_min_fields"), "herkunft_file_min_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftFileMinFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromHerkunftFileMinFields() {
  return new HerkunftFileMinFieldsModelSelector()
}

export const herkunftFileMinFieldsModelPrimitives = selectFromHerkunftFileMinFields().beschreibung.file_id.file_mime_type.herkunft_id.name
