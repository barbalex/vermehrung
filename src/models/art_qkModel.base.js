/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * art_qkBase
 * auto generated base class for the model art_qkModel.
 */
export const art_qkModelBase = ModelBase
  .named('art_qk')
  .props({
    __typename: types.optional(types.literal("art_qk"), "art_qk"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qkModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromart_qk() {
  return new art_qkModelSelector()
}

export const art_qkModelPrimitives = selectFromart_qk().beschreibung.name.sort.titel
