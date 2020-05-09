/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"


/**
 * SammlungMutationResponseBase
 * auto generated base class for the model SammlungMutationResponseModel.
 *
 * response of any mutation on the table "sammlung"
 */
export const SammlungMutationResponseModelBase = ModelBase
  .named('SammlungMutationResponse')
  .props({
    __typename: types.optional(types.literal("sammlung_mutation_response"), "sammlung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, SammlungModelSelector, builder) }
}
export function selectFromSammlungMutationResponse() {
  return new SammlungMutationResponseModelSelector()
}

export const sammlungMutationResponseModelPrimitives = selectFromSammlungMutationResponse().affected_rows
