/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlung_fileModel } from "./sammlung_fileModel"
import { sammlung_fileModelSelector } from "./sammlung_fileModel.base"


/**
 * sammlung_file_mutation_responseBase
 * auto generated base class for the model sammlung_file_mutation_responseModel.
 *
 * response of any mutation on the table "sammlung_file"
 */
export const sammlung_file_mutation_responseModelBase = ModelBase
  .named('sammlung_file_mutation_response')
  .props({
    __typename: types.optional(types.literal("sammlung_file_mutation_response"), "sammlung_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_fileModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_file_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, sammlung_fileModelSelector, builder) }
}
export function selectFromsammlung_file_mutation_response() {
  return new sammlung_file_mutation_responseModelSelector()
}

export const sammlung_file_mutation_responseModelPrimitives = selectFromsammlung_file_mutation_response().affected_rows
