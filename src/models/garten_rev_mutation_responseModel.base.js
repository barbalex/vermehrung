/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_revModel } from "./garten_revModel"
import { garten_revModelSelector } from "./garten_revModel.base"


/**
 * garten_rev_mutation_responseBase
 * auto generated base class for the model garten_rev_mutation_responseModel.
 */
export const garten_rev_mutation_responseModelBase = ModelBase
  .named('garten_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("garten_rev_mutation_response"), "garten_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, garten_revModelSelector, builder) }
}
export function selectFromgarten_rev_mutation_response() {
  return new garten_rev_mutation_responseModelSelector()
}

export const garten_rev_mutation_responseModelPrimitives = selectFromgarten_rev_mutation_response().affected_rows
