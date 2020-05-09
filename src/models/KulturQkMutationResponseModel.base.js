/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkModel } from "./KulturQkModel"
import { KulturQkModelSelector } from "./KulturQkModel.base"


/**
 * KulturQkMutationResponseBase
 * auto generated base class for the model KulturQkMutationResponseModel.
 *
 * response of any mutation on the table "kultur_qk"
 */
export const KulturQkMutationResponseModelBase = ModelBase
  .named('KulturQkMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_qk_mutation_response"), "kultur_qk_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturQkModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturQkModelSelector, builder) }
}
export function selectFromKulturQkMutationResponse() {
  return new KulturQkMutationResponseModelSelector()
}

export const kulturQkMutationResponseModelPrimitives = selectFromKulturQkMutationResponse().affected_rows
