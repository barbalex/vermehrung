/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_fileModel } from "./herkunft_fileModel"
import { herkunft_fileModelSelector } from "./herkunft_fileModel.base"


/**
 * herkunft_file_mutation_responseBase
 * auto generated base class for the model herkunft_file_mutation_responseModel.
 */
export const herkunft_file_mutation_responseModelBase = ModelBase
  .named('herkunft_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("herkunft_file_mutation_response"), "herkunft_file_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunft_fileModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, herkunft_fileModelSelector, builder) }
}
export function selectFromherkunft_file_mutation_response() {
  return new herkunft_file_mutation_responseModelSelector()
}

export const herkunft_file_mutation_responseModelPrimitives = selectFromherkunft_file_mutation_response().affected_rows
