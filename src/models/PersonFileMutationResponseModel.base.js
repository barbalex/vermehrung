/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonFileModel } from "./PersonFileModel"
import { PersonFileModelSelector } from "./PersonFileModel.base"


/**
 * PersonFileMutationResponseBase
 * auto generated base class for the model PersonFileMutationResponseModel.
 *
 * response of any mutation on the table "person_file"
 */
export const PersonFileMutationResponseModelBase = ModelBase
  .named('PersonFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("person_file_mutation_response"), "person_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => PersonFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, PersonFileModelSelector, builder) }
}
export function selectFromPersonFileMutationResponse() {
  return new PersonFileMutationResponseModelSelector()
}

export const personFileMutationResponseModelPrimitives = selectFromPersonFileMutationResponse().affected_rows
