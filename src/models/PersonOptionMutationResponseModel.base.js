/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonOptionModel } from "./PersonOptionModel"
import { PersonOptionModelSelector } from "./PersonOptionModel.base"


/**
 * PersonOptionMutationResponseBase
 * auto generated base class for the model PersonOptionMutationResponseModel.
 *
 * response of any mutation on the table "person_option"
 */
export const PersonOptionMutationResponseModelBase = ModelBase
  .named('PersonOptionMutationResponse')
  .props({
    __typename: types.optional(types.literal("person_option_mutation_response"), "person_option_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => PersonOptionModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, PersonOptionModelSelector, builder) }
}
export function selectFromPersonOptionMutationResponse() {
  return new PersonOptionMutationResponseModelSelector()
}

export const personOptionMutationResponseModelPrimitives = selectFromPersonOptionMutationResponse().affected_rows
