/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"


/**
 * ArtQkChoosenMutationResponseBase
 * auto generated base class for the model ArtQkChoosenMutationResponseModel.
 *
 * response of any mutation on the table "art_qk_choosen"
 */
export const ArtQkChoosenMutationResponseModelBase = ModelBase
  .named('ArtQkChoosenMutationResponse')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_mutation_response"), "art_qk_choosen_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ArtQkChoosenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkChoosenMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ArtQkChoosenModelSelector, builder) }
}
export function selectFromArtQkChoosenMutationResponse() {
  return new ArtQkChoosenMutationResponseModelSelector()
}

export const artQkChoosenMutationResponseModelPrimitives = selectFromArtQkChoosenMutationResponse().affected_rows
