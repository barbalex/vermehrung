/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammelLieferungRevModel } from "./SammelLieferungRevModel"
import { SammelLieferungRevModelSelector } from "./SammelLieferungRevModel.base"


/**
 * SammelLieferungRevMutationResponseBase
 * auto generated base class for the model SammelLieferungRevMutationResponseModel.
 *
 * response of any mutation on the table "sammel_lieferung_rev"
 */
export const SammelLieferungRevMutationResponseModelBase = ModelBase
  .named('SammelLieferungRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_rev_mutation_response"), "sammel_lieferung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => SammelLieferungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, SammelLieferungRevModelSelector, builder) }
}
export function selectFromSammelLieferungRevMutationResponse() {
  return new SammelLieferungRevMutationResponseModelSelector()
}

export const sammelLieferungRevMutationResponseModelPrimitives = selectFromSammelLieferungRevMutationResponse().affected_rows
