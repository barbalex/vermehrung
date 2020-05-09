/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkVarianceFieldsBase
 * auto generated base class for the model ArtQkVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const ArtQkVarianceFieldsModelBase = ModelBase
  .named('ArtQkVarianceFields')
  .props({
    __typename: types.optional(types.literal("art_qk_variance_fields"), "art_qk_variance_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkVarianceFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkVarianceFields() {
  return new ArtQkVarianceFieldsModelSelector()
}

export const artQkVarianceFieldsModelPrimitives = selectFromArtQkVarianceFields().sort
