/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"


/**
 * GartenMutationResponseBase
 * auto generated base class for the model GartenMutationResponseModel.
 *
 * response of any mutation on the table "garten"
 */
export const GartenMutationResponseModelBase = ModelBase
  .named('GartenMutationResponse')
  .props({
    __typename: types.optional(types.literal("garten_mutation_response"), "garten_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => GartenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, GartenModelSelector, builder) }
}
export function selectFromGartenMutationResponse() {
  return new GartenMutationResponseModelSelector()
}

export const gartenMutationResponseModelPrimitives = selectFromGartenMutationResponse().affected_rows
