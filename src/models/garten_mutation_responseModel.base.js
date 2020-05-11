/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"


/**
 * garten_mutation_responseBase
 * auto generated base class for the model garten_mutation_responseModel.
 *
 * response of any mutation on the table "garten"
 */
export const garten_mutation_responseModelBase = ModelBase
  .named('garten_mutation_response')
  .props({
    __typename: types.optional(types.literal("garten_mutation_response"), "garten_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gartenModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, gartenModelSelector, builder) }
}
export function selectFromgarten_mutation_response() {
  return new garten_mutation_responseModelSelector()
}

export const garten_mutation_responseModelPrimitives = selectFromgarten_mutation_response().affected_rows
