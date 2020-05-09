/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"


/**
 * GartenFileBase
 * auto generated base class for the model GartenFileModel.
 *
 * columns and relationships of "garten_file"
 */
export const GartenFileModelBase = ModelBase
  .named('GartenFile')
  .props({
    __typename: types.optional(types.literal("garten_file"), "garten_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    garten: types.union(types.undefined, types.null, types.late(() => GartenModel)),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenFileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  garten(builder) { return this.__child(`garten`, GartenModelSelector, builder) }
}
export function selectFromGartenFile() {
  return new GartenFileModelSelector()
}

export const gartenFileModelPrimitives = selectFromGartenFile().beschreibung.file_id.file_mime_type.garten_id.name
