/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtVarianceFieldsBase
 * auto generated base class for the model ArtVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const ArtVarianceFieldsModelBase = ModelBase
  .named('ArtVarianceFields')
  .props({
    __typename: types.optional(types.literal("art_variance_fields"), "art_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtVarianceFields() {
  return new ArtVarianceFieldsModelSelector()
}

export const artVarianceFieldsModelPrimitives = selectFromArtVarianceFields()._depth
