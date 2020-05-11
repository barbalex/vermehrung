/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"


/**
 * av_art_mutation_responseBase
 * auto generated base class for the model av_art_mutation_responseModel.
 *
 * response of any mutation on the table "av_art"
 */
export const av_art_mutation_responseModelBase = ModelBase
  .named('av_art_mutation_response')
  .props({
    __typename: types.optional(types.literal("av_art_mutation_response"), "av_art_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => av_artModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_art_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, av_artModelSelector, builder) }
}
export function selectFromav_art_mutation_response() {
  return new av_art_mutation_responseModelSelector()
}

export const av_art_mutation_responseModelPrimitives = selectFromav_art_mutation_response().affected_rows
