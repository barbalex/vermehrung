/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qk_choosen_revModel } from "./art_qk_choosen_revModel"
import { art_qk_choosen_revModelSelector } from "./art_qk_choosen_revModel.base"


/**
 * art_qk_choosen_rev_mutation_responseBase
 * auto generated base class for the model art_qk_choosen_rev_mutation_responseModel.
 */
export const art_qk_choosen_rev_mutation_responseModelBase = ModelBase
  .named('art_qk_choosen_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_rev_mutation_response"), "art_qk_choosen_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosen_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, art_qk_choosen_revModelSelector, builder) }
}
export function selectFromart_qk_choosen_rev_mutation_response() {
  return new art_qk_choosen_rev_mutation_responseModelSelector()
}

export const art_qk_choosen_rev_mutation_responseModelPrimitives = selectFromart_qk_choosen_rev_mutation_response().affected_rows
