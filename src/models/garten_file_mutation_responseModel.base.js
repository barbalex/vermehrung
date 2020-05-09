/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_fileModel } from "./garten_fileModel"
import { garten_fileModelSelector } from "./garten_fileModel.base"


/**
 * garten_file_mutation_responseBase
 * auto generated base class for the model garten_file_mutation_responseModel.
 *
 * response of any mutation on the table "garten_file"
 */
export const garten_file_mutation_responseModelBase = ModelBase
  .named('garten_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("garten_file_mutation_response"), "garten_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => garten_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, garten_fileModelSelector, builder) }
}
export function selectFromgarten_file_mutation_response() {
  return new garten_file_mutation_responseModelSelector()
}

export const garten_file_mutation_responseModelPrimitives = selectFromgarten_file_mutation_response().affected_rows
