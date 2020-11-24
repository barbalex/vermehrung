/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_revModel } from "./av_revModel"
import { av_revModelSelector } from "./av_revModel.base"


/**
 * av_rev_mutation_responseBase
 * auto generated base class for the model av_rev_mutation_responseModel.
 */
export const av_rev_mutation_responseModelBase = ModelBase
  .named('av_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("av_rev_mutation_response"), "av_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => av_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, av_revModelSelector, builder) }
}
export function selectFromav_rev_mutation_response() {
  return new av_rev_mutation_responseModelSelector()
}

export const av_rev_mutation_responseModelPrimitives = selectFromav_rev_mutation_response().affected_rows
