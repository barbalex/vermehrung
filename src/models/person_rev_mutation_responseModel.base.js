/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_revModel } from "./person_revModel"
import { person_revModelSelector } from "./person_revModel.base"


/**
 * person_rev_mutation_responseBase
 * auto generated base class for the model person_rev_mutation_responseModel.
 *
 * response of any mutation on the table "person_rev"
 */
export const person_rev_mutation_responseModelBase = ModelBase
  .named('person_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("person_rev_mutation_response"), "person_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => person_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, person_revModelSelector, builder) }
}
export function selectFromperson_rev_mutation_response() {
  return new person_rev_mutation_responseModelSelector()
}

export const person_rev_mutation_responseModelPrimitives = selectFromperson_rev_mutation_response().affected_rows
