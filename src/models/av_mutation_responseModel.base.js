/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { avModel } from "./avModel"
import { avModelSelector } from "./avModel.base"


/**
 * av_mutation_responseBase
 * auto generated base class for the model av_mutation_responseModel.
 */
export const av_mutation_responseModelBase = ModelBase
  .named('av_mutation_response')
  .props({
    __typename: types.optional(types.literal("av_mutation_response"), "av_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => avModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, avModelSelector, builder) }
}
export function selectFromav_mutation_response() {
  return new av_mutation_responseModelSelector()
}

export const av_mutation_responseModelPrimitives = selectFromav_mutation_response().affected_rows
