/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevSumFieldsBase
 * auto generated base class for the model ArtRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const ArtRevSumFieldsModelBase = ModelBase
  .named('ArtRevSumFields')
  .props({
    __typename: types.optional(types.literal("art_rev_sum_fields"), "art_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevSumFields() {
  return new ArtRevSumFieldsModelSelector()
}

export const artRevSumFieldsModelPrimitives = selectFromArtRevSumFields()._depth
