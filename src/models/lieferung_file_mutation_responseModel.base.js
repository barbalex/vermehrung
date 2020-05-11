/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferung_fileModel } from "./lieferung_fileModel"
import { lieferung_fileModelSelector } from "./lieferung_fileModel.base"


/**
 * lieferung_file_mutation_responseBase
 * auto generated base class for the model lieferung_file_mutation_responseModel.
 *
 * response of any mutation on the table "lieferung_file"
 */
export const lieferung_file_mutation_responseModelBase = ModelBase
  .named('lieferung_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("lieferung_file_mutation_response"), "lieferung_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_fileModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, lieferung_fileModelSelector, builder) }
}
export function selectFromlieferung_file_mutation_response() {
  return new lieferung_file_mutation_responseModelSelector()
}

export const lieferung_file_mutation_responseModelPrimitives = selectFromlieferung_file_mutation_response().affected_rows
