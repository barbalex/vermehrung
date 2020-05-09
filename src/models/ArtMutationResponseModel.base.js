/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"


/**
 * ArtMutationResponseBase
 * auto generated base class for the model ArtMutationResponseModel.
 *
 * response of any mutation on the table "art"
 */
export const ArtMutationResponseModelBase = ModelBase
  .named('ArtMutationResponse')
  .props({
    __typename: types.optional(types.literal("art_mutation_response"), "art_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ArtModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ArtModelSelector, builder) }
}
export function selectFromArtMutationResponse() {
  return new ArtMutationResponseModelSelector()
}

export const artMutationResponseModelPrimitives = selectFromArtMutationResponse().affected_rows
