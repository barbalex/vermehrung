/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"


/**
 * kultur_mutation_responseBase
 * auto generated base class for the model kultur_mutation_responseModel.
 *
 * response of any mutation on the table "kultur"
 */
export const kultur_mutation_responseModelBase = ModelBase
  .named('kultur_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_mutation_response"), "kultur_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kulturModelSelector, builder) }
}
export function selectFromkultur_mutation_response() {
  return new kultur_mutation_responseModelSelector()
}

export const kultur_mutation_responseModelPrimitives = selectFromkultur_mutation_response().affected_rows
