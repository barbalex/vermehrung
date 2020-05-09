/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungFileModel } from "./SammlungFileModel"
import { SammlungFileModelSelector } from "./SammlungFileModel.base"


/**
 * SammlungFileMutationResponseBase
 * auto generated base class for the model SammlungFileMutationResponseModel.
 *
 * response of any mutation on the table "sammlung_file"
 */
export const SammlungFileMutationResponseModelBase = ModelBase
  .named('SammlungFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("sammlung_file_mutation_response"), "sammlung_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => SammlungFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, SammlungFileModelSelector, builder) }
}
export function selectFromSammlungFileMutationResponse() {
  return new SammlungFileMutationResponseModelSelector()
}

export const sammlungFileMutationResponseModelPrimitives = selectFromSammlungFileMutationResponse().affected_rows
