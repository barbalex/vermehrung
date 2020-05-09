/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturFileModel } from "./KulturFileModel"
import { KulturFileModelSelector } from "./KulturFileModel.base"


/**
 * KulturFileMutationResponseBase
 * auto generated base class for the model KulturFileMutationResponseModel.
 *
 * response of any mutation on the table "kultur_file"
 */
export const KulturFileMutationResponseModelBase = ModelBase
  .named('KulturFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_file_mutation_response"), "kultur_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturFileModelSelector, builder) }
}
export function selectFromKulturFileMutationResponse() {
  return new KulturFileMutationResponseModelSelector()
}

export const kulturFileMutationResponseModelPrimitives = selectFromKulturFileMutationResponse().affected_rows
