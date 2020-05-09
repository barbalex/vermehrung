/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftFileModel } from "./HerkunftFileModel"
import { HerkunftFileModelSelector } from "./HerkunftFileModel.base"


/**
 * HerkunftFileMutationResponseBase
 * auto generated base class for the model HerkunftFileMutationResponseModel.
 *
 * response of any mutation on the table "herkunft_file"
 */
export const HerkunftFileMutationResponseModelBase = ModelBase
  .named('HerkunftFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("herkunft_file_mutation_response"), "herkunft_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => HerkunftFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, HerkunftFileModelSelector, builder) }
}
export function selectFromHerkunftFileMutationResponse() {
  return new HerkunftFileMutationResponseModelSelector()
}

export const herkunftFileMutationResponseModelPrimitives = selectFromHerkunftFileMutationResponse().affected_rows
