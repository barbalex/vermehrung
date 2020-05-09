/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"


/**
 * LieferungFileBase
 * auto generated base class for the model LieferungFileModel.
 *
 * columns and relationships of "lieferung_file"
 */
export const LieferungFileModelBase = ModelBase
  .named('LieferungFile')
  .props({
    __typename: types.optional(types.literal("lieferung_file"), "lieferung_file"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    lieferung: types.union(types.undefined, types.null, types.late(() => LieferungModel)),
    lieferung_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungFileModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get file_id() { return this.__attr(`file_id`) }
  get file_mime_type() { return this.__attr(`file_mime_type`) }
  get id() { return this.__attr(`id`) }
  get lieferung_id() { return this.__attr(`lieferung_id`) }
  get name() { return this.__attr(`name`) }
  lieferung(builder) { return this.__child(`lieferung`, LieferungModelSelector, builder) }
}
export function selectFromLieferungFile() {
  return new LieferungFileModelSelector()
}

export const lieferungFileModelPrimitives = selectFromLieferungFile().beschreibung.file_id.file_mime_type.lieferung_id.name
