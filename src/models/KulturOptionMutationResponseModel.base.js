/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturOptionModel } from "./KulturOptionModel"
import { KulturOptionModelSelector } from "./KulturOptionModel.base"


/**
 * KulturOptionMutationResponseBase
 * auto generated base class for the model KulturOptionMutationResponseModel.
 *
 * response of any mutation on the table "kultur_option"
 */
export const KulturOptionMutationResponseModelBase = ModelBase
  .named('KulturOptionMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_option_mutation_response"), "kultur_option_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturOptionModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturOptionModelSelector, builder) }
}
export function selectFromKulturOptionMutationResponse() {
  return new KulturOptionMutationResponseModelSelector()
}

export const kulturOptionMutationResponseModelPrimitives = selectFromKulturOptionMutationResponse().affected_rows
