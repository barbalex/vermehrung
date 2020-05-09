/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"


/**
 * LieferungMutationResponseBase
 * auto generated base class for the model LieferungMutationResponseModel.
 *
 * response of any mutation on the table "lieferung"
 */
export const LieferungMutationResponseModelBase = ModelBase
  .named('LieferungMutationResponse')
  .props({
    __typename: types.optional(types.literal("lieferung_mutation_response"), "lieferung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, LieferungModelSelector, builder) }
}
export function selectFromLieferungMutationResponse() {
  return new LieferungMutationResponseModelSelector()
}

export const lieferungMutationResponseModelPrimitives = selectFromLieferungMutationResponse().affected_rows
