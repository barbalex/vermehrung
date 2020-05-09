/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AeArtModel } from "./AeArtModel"
import { AeArtModelSelector } from "./AeArtModel.base"


/**
 * AeArtMutationResponseBase
 * auto generated base class for the model AeArtMutationResponseModel.
 *
 * response of any mutation on the table "ae_art"
 */
export const AeArtMutationResponseModelBase = ModelBase
  .named('AeArtMutationResponse')
  .props({
    __typename: types.optional(types.literal("ae_art_mutation_response"), "ae_art_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => AeArtModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AeArtMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, AeArtModelSelector, builder) }
}
export function selectFromAeArtMutationResponse() {
  return new AeArtMutationResponseModelSelector()
}

export const aeArtMutationResponseModelPrimitives = selectFromAeArtMutationResponse().affected_rows
