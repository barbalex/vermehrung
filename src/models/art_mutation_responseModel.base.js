/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"


/**
 * art_mutation_responseBase
 * auto generated base class for the model art_mutation_responseModel.
 */
export const art_mutation_responseModelBase = ModelBase
  .named('art_mutation_response')
  .props({
    __typename: types.optional(types.literal("art_mutation_response"), "art_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => artModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, artModelSelector, builder) }
}
export function selectFromart_mutation_response() {
  return new art_mutation_responseModelSelector()
}

export const art_mutation_responseModelPrimitives = selectFromart_mutation_response().affected_rows
