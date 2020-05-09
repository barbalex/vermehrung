/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungRevModel } from "./LieferungRevModel"
import { LieferungRevModelSelector } from "./LieferungRevModel.base"


/**
 * LieferungRevMutationResponseBase
 * auto generated base class for the model LieferungRevMutationResponseModel.
 *
 * response of any mutation on the table "lieferung_rev"
 */
export const LieferungRevMutationResponseModelBase = ModelBase
  .named('LieferungRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("lieferung_rev_mutation_response"), "lieferung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => LieferungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, LieferungRevModelSelector, builder) }
}
export function selectFromLieferungRevMutationResponse() {
  return new LieferungRevMutationResponseModelSelector()
}

export const lieferungRevMutationResponseModelPrimitives = selectFromLieferungRevMutationResponse().affected_rows
