/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"


/**
 * AvArtMutationResponseBase
 * auto generated base class for the model AvArtMutationResponseModel.
 *
 * response of any mutation on the table "av_art"
 */
export const AvArtMutationResponseModelBase = ModelBase
  .named('AvArtMutationResponse')
  .props({
    __typename: types.optional(types.literal("av_art_mutation_response"), "av_art_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => AvArtModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AvArtMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, AvArtModelSelector, builder) }
}
export function selectFromAvArtMutationResponse() {
  return new AvArtMutationResponseModelSelector()
}

export const avArtMutationResponseModelPrimitives = selectFromAvArtMutationResponse().affected_rows
