/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"


/**
 * HerkunftFileBase
 * auto generated base class for the model HerkunftFileModel.
 *
 * columns and relationships of "herkunft_file"
 */
export const HerkunftFileModelBase = ModelBase
  .named('HerkunftFile')
  .props({
    __typename: types.optional(types.literal("herkunft_file"), "herkunft_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    herkunft: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftFileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  herkunft(builder) { return this.__child(`herkunft`, HerkunftModelSelector, builder) }
}
export function selectFromHerkunftFile() {
  return new HerkunftFileModelSelector()
}

export const herkunftFileModelPrimitives = selectFromHerkunftFile().beschreibung.file_id.file_mime_type.herkunft_id.name
