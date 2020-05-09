/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungRevModel } from "./SammlungRevModel"
import { SammlungRevModelSelector } from "./SammlungRevModel.base"


/**
 * SammlungRevMutationResponseBase
 * auto generated base class for the model SammlungRevMutationResponseModel.
 *
 * response of any mutation on the table "sammlung_rev"
 */
export const SammlungRevMutationResponseModelBase = ModelBase
  .named('SammlungRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_mutation_response"), "sammlung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => SammlungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, SammlungRevModelSelector, builder) }
}
export function selectFromSammlungRevMutationResponse() {
  return new SammlungRevMutationResponseModelSelector()
}

export const sammlungRevMutationResponseModelPrimitives = selectFromSammlungRevMutationResponse().affected_rows
