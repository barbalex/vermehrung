/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelSelector } from "./art_qkModel.base"


/**
 * art_qk_mutation_responseBase
 * auto generated base class for the model art_qk_mutation_responseModel.
 */
export const art_qk_mutation_responseModelBase = ModelBase
  .named('art_qk_mutation_response')
  .props({
    __typename: types.optional(types.literal("art_qk_mutation_response"), "art_qk_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qkModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, art_qkModelSelector, builder) }
}
export function selectFromart_qk_mutation_response() {
  return new art_qk_mutation_responseModelSelector()
}

export const art_qk_mutation_responseModelPrimitives = selectFromart_qk_mutation_response().affected_rows
