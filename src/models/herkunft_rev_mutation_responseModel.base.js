/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_revModel } from "./herkunft_revModel"
import { herkunft_revModelSelector } from "./herkunft_revModel.base"


/**
 * herkunft_rev_mutation_responseBase
 * auto generated base class for the model herkunft_rev_mutation_responseModel.
 *
 * response of any mutation on the table "herkunft_rev"
 */
export const herkunft_rev_mutation_responseModelBase = ModelBase
  .named('herkunft_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_mutation_response"), "herkunft_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => herkunft_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, herkunft_revModelSelector, builder) }
}
export function selectFromherkunft_rev_mutation_response() {
  return new herkunft_rev_mutation_responseModelSelector()
}

export const herkunft_rev_mutation_responseModelPrimitives = selectFromherkunft_rev_mutation_response().affected_rows
