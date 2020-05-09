/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturRevModel } from "./TeilkulturRevModel"
import { TeilkulturRevModelSelector } from "./TeilkulturRevModel.base"


/**
 * TeilkulturRevMutationResponseBase
 * auto generated base class for the model TeilkulturRevMutationResponseModel.
 *
 * response of any mutation on the table "teilkultur_rev"
 */
export const TeilkulturRevMutationResponseModelBase = ModelBase
  .named('TeilkulturRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_mutation_response"), "teilkultur_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => TeilkulturRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, TeilkulturRevModelSelector, builder) }
}
export function selectFromTeilkulturRevMutationResponse() {
  return new TeilkulturRevMutationResponseModelSelector()
}

export const teilkulturRevMutationResponseModelPrimitives = selectFromTeilkulturRevMutationResponse().affected_rows
