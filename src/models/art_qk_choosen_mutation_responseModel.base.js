/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"


/**
 * art_qk_choosen_mutation_responseBase
 * auto generated base class for the model art_qk_choosen_mutation_responseModel.
 *
 * response of any mutation on the table "art_qk_choosen"
 */
export const art_qk_choosen_mutation_responseModelBase = ModelBase
  .named('art_qk_choosen_mutation_response')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_mutation_response"), "art_qk_choosen_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosenModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, art_qk_choosenModelSelector, builder) }
}
export function selectFromart_qk_choosen_mutation_response() {
  return new art_qk_choosen_mutation_responseModelSelector()
}

export const art_qk_choosen_mutation_responseModelPrimitives = selectFromart_qk_choosen_mutation_response().affected_rows
