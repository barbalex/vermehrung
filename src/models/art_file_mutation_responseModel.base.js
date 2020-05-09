/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelSelector } from "./art_fileModel.base"


/**
 * art_file_mutation_responseBase
 * auto generated base class for the model art_file_mutation_responseModel.
 *
 * response of any mutation on the table "art_file"
 */
export const art_file_mutation_responseModelBase = ModelBase
  .named('art_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("art_file_mutation_response"), "art_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => art_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, art_fileModelSelector, builder) }
}
export function selectFromart_file_mutation_response() {
  return new art_file_mutation_responseModelSelector()
}

export const art_file_mutation_responseModelPrimitives = selectFromart_file_mutation_response().affected_rows
