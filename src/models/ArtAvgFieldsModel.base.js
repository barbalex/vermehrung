/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtAvgFieldsBase
 * auto generated base class for the model ArtAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const ArtAvgFieldsModelBase = ModelBase
  .named('ArtAvgFields')
  .props({
    __typename: types.optional(types.literal("art_avg_fields"), "art_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtAvgFields() {
  return new ArtAvgFieldsModelSelector()
}

export const artAvgFieldsModelPrimitives = selectFromArtAvgFields()._depth
