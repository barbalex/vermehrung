/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonOptionRevModel } from "./PersonOptionRevModel"
import { PersonOptionRevModelSelector } from "./PersonOptionRevModel.base"


/**
 * PersonOptionRevMutationResponseBase
 * auto generated base class for the model PersonOptionRevMutationResponseModel.
 *
 * response of any mutation on the table "person_option_rev"
 */
export const PersonOptionRevMutationResponseModelBase = ModelBase
  .named('PersonOptionRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("person_option_rev_mutation_response"), "person_option_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => PersonOptionRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, PersonOptionRevModelSelector, builder) }
}
export function selectFromPersonOptionRevMutationResponse() {
  return new PersonOptionRevMutationResponseModelSelector()
}

export const personOptionRevMutationResponseModelPrimitives = selectFromPersonOptionRevMutationResponse().affected_rows
