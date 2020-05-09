/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtFileModel } from "./ArtFileModel"
import { ArtFileModelSelector } from "./ArtFileModel.base"


/**
 * ArtFileMutationResponseBase
 * auto generated base class for the model ArtFileMutationResponseModel.
 *
 * response of any mutation on the table "art_file"
 */
export const ArtFileMutationResponseModelBase = ModelBase
  .named('ArtFileMutationResponse')
  .props({
    __typename: types.optional(types.literal("art_file_mutation_response"), "art_file_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ArtFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtFileMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ArtFileModelSelector, builder) }
}
export function selectFromArtFileMutationResponse() {
  return new ArtFileMutationResponseModelSelector()
}

export const artFileMutationResponseModelPrimitives = selectFromArtFileMutationResponse().affected_rows
