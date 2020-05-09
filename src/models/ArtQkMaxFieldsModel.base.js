/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkMaxFieldsBase
 * auto generated base class for the model ArtQkMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const ArtQkMaxFieldsModelBase = ModelBase
  .named('ArtQkMaxFields')
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

export class ArtQkMaxFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromArtQkMaxFields() {
  return new ArtQkMaxFieldsModelSelector()
}

export const artQkMaxFieldsModelPrimitives = selectFromArtQkMaxFields().beschreibung.name.sort.titel
