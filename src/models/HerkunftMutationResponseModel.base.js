/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"


/**
 * HerkunftMutationResponseBase
 * auto generated base class for the model HerkunftMutationResponseModel.
 *
 * response of any mutation on the table "herkunft"
 */
export const HerkunftMutationResponseModelBase = ModelBase
  .named('HerkunftMutationResponse')
  .props({
    __typename: types.optional(types.literal("herkunft_mutation_response"), "herkunft_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => HerkunftModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, HerkunftModelSelector, builder) }
}
export function selectFromHerkunftMutationResponse() {
  return new HerkunftMutationResponseModelSelector()
}

export const herkunftMutationResponseModelPrimitives = selectFromHerkunftMutationResponse().affected_rows
