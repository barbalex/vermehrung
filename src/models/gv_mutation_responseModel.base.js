/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gvModel } from "./gvModel"
import { gvModelSelector } from "./gvModel.base"


/**
 * gv_mutation_responseBase
 * auto generated base class for the model gv_mutation_responseModel.
 */
export const gv_mutation_responseModelBase = ModelBase
  .named('gv_mutation_response')
  .props({
    __typename: types.optional(types.literal("gv_mutation_response"), "gv_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gvModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, gvModelSelector, builder) }
}
export function selectFromgv_mutation_response() {
  return new gv_mutation_responseModelSelector()
}

export const gv_mutation_responseModelPrimitives = selectFromgv_mutation_response().affected_rows
