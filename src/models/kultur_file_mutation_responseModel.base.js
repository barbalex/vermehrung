/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_fileModel } from "./kultur_fileModel"
import { kultur_fileModelSelector } from "./kultur_fileModel.base"


/**
 * kultur_file_mutation_responseBase
 * auto generated base class for the model kultur_file_mutation_responseModel.
 */
export const kultur_file_mutation_responseModelBase = ModelBase
  .named('kultur_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_file_mutation_response"), "kultur_file_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_fileModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kultur_fileModelSelector, builder) }
}
export function selectFromkultur_file_mutation_response() {
  return new kultur_file_mutation_responseModelSelector()
}

export const kultur_file_mutation_responseModelPrimitives = selectFromkultur_file_mutation_response().affected_rows
