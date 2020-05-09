/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtSumFieldsBase
 * auto generated base class for the model ArtSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const ArtSumFieldsModelBase = ModelBase
  .named('ArtSumFields')
  .props({
    __typename: types.optional(types.literal("art_sum_fields"), "art_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtSumFields() {
  return new ArtSumFieldsModelSelector()
}

export const artSumFieldsModelPrimitives = selectFromArtSumFields()._depth
