/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"


/**
 * KulturMutationResponseBase
 * auto generated base class for the model KulturMutationResponseModel.
 *
 * response of any mutation on the table "kultur"
 */
export const KulturMutationResponseModelBase = ModelBase
  .named('KulturMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_mutation_response"), "kultur_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturModelSelector, builder) }
}
export function selectFromKulturMutationResponse() {
  return new KulturMutationResponseModelSelector()
}

export const kulturMutationResponseModelPrimitives = selectFromKulturMutationResponse().affected_rows
