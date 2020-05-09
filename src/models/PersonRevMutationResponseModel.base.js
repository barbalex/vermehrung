/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonRevModel } from "./PersonRevModel"
import { PersonRevModelSelector } from "./PersonRevModel.base"


/**
 * PersonRevMutationResponseBase
 * auto generated base class for the model PersonRevMutationResponseModel.
 *
 * response of any mutation on the table "person_rev"
 */
export const PersonRevMutationResponseModelBase = ModelBase
  .named('PersonRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("person_rev_mutation_response"), "person_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => PersonRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, PersonRevModelSelector, builder) }
}
export function selectFromPersonRevMutationResponse() {
  return new PersonRevMutationResponseModelSelector()
}

export const personRevMutationResponseModelPrimitives = selectFromPersonRevMutationResponse().affected_rows
