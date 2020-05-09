/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * SammlungFileBase
 * auto generated base class for the model SammlungFileModel.
 *
 * columns and relationships of "sammlung_file"
 */
export const SammlungFileModelBase = ModelBase
  .named('SammlungFile')
  .props({
    __typename: types.optional(types.literal("sammlung_file"), "sammlung_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    sammlung: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungFileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get sammlung_id() { return this.__attr(`sammlung_id`) }
  sammlung(builder) { return this.__child(`sammlung`, SammlungModelSelector, builder) }
}
export function selectFromSammlungFile() {
  return new SammlungFileModelSelector()
}

export const sammlungFileModelPrimitives = selectFromSammlungFile().beschreibung.file_id.file_mime_type.name.sammlung_id
