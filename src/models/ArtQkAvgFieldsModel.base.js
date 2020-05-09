/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkAvgFieldsBase
 * auto generated base class for the model ArtQkAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const ArtQkAvgFieldsModelBase = ModelBase
  .named('ArtQkAvgFields')
  .props({
    __typename: types.optional(types.literal("art_qk_avg_fields"), "art_qk_avg_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkAvgFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkAvgFields() {
  return new ArtQkAvgFieldsModelSelector()
}

export const artQkAvgFieldsModelPrimitives = selectFromArtQkAvgFields().sort
