/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturOptionRevModel } from "./KulturOptionRevModel"
import { KulturOptionRevModelSelector } from "./KulturOptionRevModel.base"


/**
 * KulturOptionRevMutationResponseBase
 * auto generated base class for the model KulturOptionRevMutationResponseModel.
 *
 * response of any mutation on the table "kultur_option_rev"
 */
export const KulturOptionRevMutationResponseModelBase = ModelBase
  .named('KulturOptionRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_mutation_response"), "kultur_option_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturOptionRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturOptionRevModelSelector, builder) }
}
export function selectFromKulturOptionRevMutationResponse() {
  return new KulturOptionRevMutationResponseModelSelector()
}

export const kulturOptionRevMutationResponseModelPrimitives = selectFromKulturOptionRevMutationResponse().affected_rows
