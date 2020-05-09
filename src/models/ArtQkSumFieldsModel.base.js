/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkSumFieldsBase
 * auto generated base class for the model ArtQkSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const ArtQkSumFieldsModelBase = ModelBase
  .named('ArtQkSumFields')
  .props({
    __typename: types.optional(types.literal("art_qk_sum_fields"), "art_qk_sum_fields"),
    sort: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkSumFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkSumFields() {
  return new ArtQkSumFieldsModelSelector()
}

export const artQkSumFieldsModelPrimitives = selectFromArtQkSumFields().sort
