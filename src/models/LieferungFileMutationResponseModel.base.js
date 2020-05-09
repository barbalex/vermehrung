/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungFileModel } from "./LieferungFileModel"
import { LieferungFileModelSelector } from "./LieferungFileModel.base"


/**
 * LieferungFileMutationResponseBase
 * auto generated base class for the model LieferungFileMutationResponseModel.
 *
 * response of any mutation on the table "lieferung_file"
 */
export const LieferungFileMutationResponseModelBase = ModelBase
  .named('LieferungFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("lieferung_file_mutation_response"), "lieferung_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => LieferungFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, LieferungFileModelSelector, builder) }
}
export function selectFromLieferungFileMutationResponse() {
  return new LieferungFileMutationResponseModelSelector()
}

export const lieferungFileMutationResponseModelPrimitives = selectFromLieferungFileMutationResponse().affected_rows
