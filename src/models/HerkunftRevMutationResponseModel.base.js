/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftRevModel } from "./HerkunftRevModel"
import { HerkunftRevModelSelector } from "./HerkunftRevModel.base"


/**
 * HerkunftRevMutationResponseBase
 * auto generated base class for the model HerkunftRevMutationResponseModel.
 *
 * response of any mutation on the table "herkunft_rev"
 */
export const HerkunftRevMutationResponseModelBase = ModelBase
  .named('HerkunftRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_mutation_response"), "herkunft_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => HerkunftRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, HerkunftRevModelSelector, builder) }
}
export function selectFromHerkunftRevMutationResponse() {
  return new HerkunftRevMutationResponseModelSelector()
}

export const herkunftRevMutationResponseModelPrimitives = selectFromHerkunftRevMutationResponse().affected_rows
