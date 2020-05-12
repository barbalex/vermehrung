/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qk_max_fieldsBase
 * auto generated base class for the model art_qk_max_fieldsModel.
 */
export const art_qk_max_fieldsModelBase = ModelBase
  .named('art_qk_max_fields')
  .props({
    __typename: types.optional(types.literal("art_qk_max_fields"), "art_qk_max_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_max_fieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromart_qk_max_fields() {
  return new art_qk_max_fieldsModelSelector()
}

export const art_qk_max_fieldsModelPrimitives = selectFromart_qk_max_fields().beschreibung.name.sort.titel
