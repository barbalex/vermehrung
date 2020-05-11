/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"


/**
 * herkunft_fileBase
 * auto generated base class for the model herkunft_fileModel.
 *
 * columns and relationships of "herkunft_file"
 */
export const herkunft_fileModelBase = ModelBase
  .named('herkunft_file')
  .props({
    __typename: types.optional(types.literal("herkunft_file"), "herkunft_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    herkunft: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_fileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  herkunft(builder) { return this.__child(`herkunft`, herkunftModelSelector, builder) }
}
export function selectFromherkunft_file() {
  return new herkunft_fileModelSelector()
}

export const herkunft_fileModelPrimitives = selectFromherkunft_file().beschreibung.file_id.file_mime_type.herkunft_id.name
