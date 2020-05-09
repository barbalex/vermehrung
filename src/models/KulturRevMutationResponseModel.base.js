/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturRevModel } from "./KulturRevModel"
import { KulturRevModelSelector } from "./KulturRevModel.base"


/**
 * KulturRevMutationResponseBase
 * auto generated base class for the model KulturRevMutationResponseModel.
 *
 * response of any mutation on the table "kultur_rev"
 */
export const KulturRevMutationResponseModelBase = ModelBase
  .named('KulturRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_rev_mutation_response"), "kultur_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturRevModelSelector, builder) }
}
export function selectFromKulturRevMutationResponse() {
  return new KulturRevMutationResponseModelSelector()
}

export const kulturRevMutationResponseModelPrimitives = selectFromKulturRevMutationResponse().affected_rows
