/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"


/**
 * SammelLieferungMutationResponseBase
 * auto generated base class for the model SammelLieferungMutationResponseModel.
 *
 * response of any mutation on the table "sammel_lieferung"
 */
export const SammelLieferungMutationResponseModelBase = ModelBase
  .named('SammelLieferungMutationResponse')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_mutation_response"), "sammel_lieferung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, SammelLieferungModelSelector, builder) }
}
export function selectFromSammelLieferungMutationResponse() {
  return new SammelLieferungMutationResponseModelSelector()
}

export const sammelLieferungMutationResponseModelPrimitives = selectFromSammelLieferungMutationResponse().affected_rows
