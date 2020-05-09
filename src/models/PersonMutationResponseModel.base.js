/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"


/**
 * PersonMutationResponseBase
 * auto generated base class for the model PersonMutationResponseModel.
 *
 * response of any mutation on the table "person"
 */
export const PersonMutationResponseModelBase = ModelBase
  .named('PersonMutationResponse')
  .props({
    __typename: types.optional(types.literal("person_mutation_response"), "person_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => PersonModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, PersonModelSelector, builder) }
}
export function selectFromPersonMutationResponse() {
  return new PersonMutationResponseModelSelector()
}

export const personMutationResponseModelPrimitives = selectFromPersonMutationResponse().affected_rows
