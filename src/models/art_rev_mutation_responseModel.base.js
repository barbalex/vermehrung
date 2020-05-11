/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_revModel } from "./art_revModel"
import { art_revModelSelector } from "./art_revModel.base"


/**
 * art_rev_mutation_responseBase
 * auto generated base class for the model art_rev_mutation_responseModel.
 *
 * response of any mutation on the table "art_rev"
 */
export const art_rev_mutation_responseModelBase = ModelBase
  .named('art_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("art_rev_mutation_response"), "art_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, art_revModelSelector, builder) }
}
export function selectFromart_rev_mutation_response() {
  return new art_rev_mutation_responseModelSelector()
}

export const art_rev_mutation_responseModelPrimitives = selectFromart_rev_mutation_response().affected_rows
