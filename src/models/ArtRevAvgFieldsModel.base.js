/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevAvgFieldsBase
 * auto generated base class for the model ArtRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const ArtRevAvgFieldsModelBase = ModelBase
  .named('ArtRevAvgFields')
  .props({
    __typename: types.optional(types.literal("art_rev_avg_fields"), "art_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevAvgFields() {
  return new ArtRevAvgFieldsModelSelector()
}

export const artRevAvgFieldsModelPrimitives = selectFromArtRevAvgFields()._depth
