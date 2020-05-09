/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenFileModel } from "./GartenFileModel"
import { GartenFileModelSelector } from "./GartenFileModel.base"


/**
 * GartenFileMutationResponseBase
 * auto generated base class for the model GartenFileMutationResponseModel.
 *
 * response of any mutation on the table "garten_file"
 */
export const GartenFileMutationResponseModelBase = ModelBase
  .named('GartenFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("garten_file_mutation_response"), "garten_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => GartenFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, GartenFileModelSelector, builder) }
}
export function selectFromGartenFileMutationResponse() {
  return new GartenFileMutationResponseModelSelector()
}

export const gartenFileMutationResponseModelPrimitives = selectFromGartenFileMutationResponse().affected_rows
