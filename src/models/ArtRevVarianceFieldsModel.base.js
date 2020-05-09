/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevVarianceFieldsBase
 * auto generated base class for the model ArtRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const ArtRevVarianceFieldsModelBase = ModelBase
  .named('ArtRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("art_rev_variance_fields"), "art_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevVarianceFields() {
  return new ArtRevVarianceFieldsModelSelector()
}

export const artRevVarianceFieldsModelPrimitives = selectFromArtRevVarianceFields()._depth
