/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_option_revModel } from "./person_option_revModel"
import { person_option_revModelSelector } from "./person_option_revModel.base"


/**
 * person_option_rev_mutation_responseBase
 * auto generated base class for the model person_option_rev_mutation_responseModel.
 *
 * response of any mutation on the table "person_option_rev"
 */
export const person_option_rev_mutation_responseModelBase = ModelBase
  .named('person_option_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("person_option_rev_mutation_response"), "person_option_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_option_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_option_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, person_option_revModelSelector, builder) }
}
export function selectFromperson_option_rev_mutation_response() {
  return new person_option_rev_mutation_responseModelSelector()
}

export const person_option_rev_mutation_responseModelPrimitives = selectFromperson_option_rev_mutation_response().affected_rows
