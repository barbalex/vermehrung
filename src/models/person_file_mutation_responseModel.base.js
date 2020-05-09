/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelSelector } from "./person_fileModel.base"


/**
 * person_file_mutation_responseBase
 * auto generated base class for the model person_file_mutation_responseModel.
 *
 * response of any mutation on the table "person_file"
 */
export const person_file_mutation_responseModelBase = ModelBase
  .named('person_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("person_file_mutation_response"), "person_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => person_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, person_fileModelSelector, builder) }
}
export function selectFromperson_file_mutation_response() {
  return new person_file_mutation_responseModelSelector()
}

export const person_file_mutation_responseModelPrimitives = selectFromperson_file_mutation_response().affected_rows
