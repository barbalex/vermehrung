/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkModel } from "./ArtQkModel"
import { ArtQkModelSelector } from "./ArtQkModel.base"


/**
 * ArtQkMutationResponseBase
 * auto generated base class for the model ArtQkMutationResponseModel.
 *
 * response of any mutation on the table "art_qk"
 */
export const ArtQkMutationResponseModelBase = ModelBase
  .named('ArtQkMutationResponse')
  .props({
    __typename: types.optional(types.literal("art_qk_mutation_response"), "art_qk_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ArtQkModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ArtQkModelSelector, builder) }
}
export function selectFromArtQkMutationResponse() {
  return new ArtQkMutationResponseModelSelector()
}

export const artQkMutationResponseModelPrimitives = selectFromArtQkMutationResponse().affected_rows
