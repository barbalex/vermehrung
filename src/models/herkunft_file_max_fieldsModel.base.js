/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * herkunft_file_max_fieldsBase
 * auto generated base class for the model herkunft_file_max_fieldsModel.
 *
 * aggregate max on columns
 */
export const herkunft_file_max_fieldsModelBase = ModelBase
  .named('herkunft_file_max_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_file_max_fields"), "herkunft_file_max_fields"),
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

export class herkunft_file_max_fieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromherkunft_file_max_fields() {
  return new herkunft_file_max_fieldsModelSelector()
}

export const herkunft_file_max_fieldsModelPrimitives = selectFromherkunft_file_max_fields().beschreibung.file_id.file_mime_type.herkunft_id.name
