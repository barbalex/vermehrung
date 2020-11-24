/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"


/**
 * herkunft_mutation_responseBase
 * auto generated base class for the model herkunft_mutation_responseModel.
 */
export const herkunft_mutation_responseModelBase = ModelBase
  .named('herkunft_mutation_response')
  .props({
    __typename: types.optional(types.literal("herkunft_mutation_response"), "herkunft_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunftModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, herkunftModelSelector, builder) }
}
export function selectFromherkunft_mutation_response() {
  return new herkunft_mutation_responseModelSelector()
}

export const herkunft_mutation_responseModelPrimitives = selectFromherkunft_mutation_response().affected_rows
