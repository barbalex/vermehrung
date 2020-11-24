/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_file_max_fieldsBase
 * auto generated base class for the model sammlung_file_max_fieldsModel.
 */
export const sammlung_file_max_fieldsModelBase = ModelBase
  .named('sammlung_file_max_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_file_max_fields"), "sammlung_file_max_fields"),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
    sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_file_max_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sammlung_id() { return this.__attr(`sammlung_id`) }
}
export function selectFromsammlung_file_max_fields() {
  return new sammlung_file_max_fieldsModelSelector()
}

export const sammlung_file_max_fieldsModelPrimitives = selectFromsammlung_file_max_fields()._rev_at.beschreibung.changed.file_id.file_mime_type.name.sammlung_id
