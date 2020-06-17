/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gv_revModel } from "./gv_revModel"
import { gv_revModelSelector } from "./gv_revModel.base"


/**
 * gv_rev_mutation_responseBase
 * auto generated base class for the model gv_rev_mutation_responseModel.
 */
export const gv_rev_mutation_responseModelBase = ModelBase
  .named('gv_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("gv_rev_mutation_response"), "gv_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gv_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, gv_revModelSelector, builder) }
}
export function selectFromgv_rev_mutation_response() {
  return new gv_rev_mutation_responseModelSelector()
}

export const gv_rev_mutation_responseModelPrimitives = selectFromgv_rev_mutation_response().affected_rows
