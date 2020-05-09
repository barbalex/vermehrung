/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtRevModel } from "./ArtRevModel"
import { ArtRevModelSelector } from "./ArtRevModel.base"


/**
 * ArtRevMutationResponseBase
 * auto generated base class for the model ArtRevMutationResponseModel.
 *
 * response of any mutation on the table "art_rev"
 */
export const ArtRevMutationResponseModelBase = ModelBase
  .named('ArtRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("art_rev_mutation_response"), "art_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ArtRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ArtRevModelSelector, builder) }
}
export function selectFromArtRevMutationResponse() {
  return new ArtRevMutationResponseModelSelector()
}

export const artRevMutationResponseModelPrimitives = selectFromArtRevMutationResponse().affected_rows
