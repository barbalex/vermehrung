/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenRevModel } from "./GartenRevModel"
import { GartenRevModelSelector } from "./GartenRevModel.base"


/**
 * GartenRevMutationResponseBase
 * auto generated base class for the model GartenRevMutationResponseModel.
 *
 * response of any mutation on the table "garten_rev"
 */
export const GartenRevMutationResponseModelBase = ModelBase
  .named('GartenRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("garten_rev_mutation_response"), "garten_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => GartenRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, GartenRevModelSelector, builder) }
}
export function selectFromGartenRevMutationResponse() {
  return new GartenRevMutationResponseModelSelector()
}

export const gartenRevMutationResponseModelPrimitives = selectFromGartenRevMutationResponse().affected_rows
