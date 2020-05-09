/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelSelector } from "./kultur_revModel.base"


/**
 * kultur_rev_mutation_responseBase
 * auto generated base class for the model kultur_rev_mutation_responseModel.
 *
 * response of any mutation on the table "kultur_rev"
 */
export const kultur_rev_mutation_responseModelBase = ModelBase
  .named('kultur_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_rev_mutation_response"), "kultur_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => kultur_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kultur_revModelSelector, builder) }
}
export function selectFromkultur_rev_mutation_response() {
  return new kultur_rev_mutation_responseModelSelector()
}

export const kultur_rev_mutation_responseModelPrimitives = selectFromkultur_rev_mutation_response().affected_rows
