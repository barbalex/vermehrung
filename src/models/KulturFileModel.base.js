/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"


/**
 * KulturFileBase
 * auto generated base class for the model KulturFileModel.
 *
 * columns and relationships of "kultur_file"
 */
export const KulturFileModelBase = ModelBase
  .named('KulturFile')
  .props({
    __typename: types.optional(types.literal("kultur_file"), "kultur_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kultur: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturFileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get name() { return this.__attr(`name`) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
}
export function selectFromKulturFile() {
  return new KulturFileModelSelector()
}

export const kulturFileModelPrimitives = selectFromKulturFile().beschreibung.file_id.file_mime_type.kultur_id.name
