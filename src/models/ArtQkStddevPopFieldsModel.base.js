/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkStddevPopFieldsBase
 * auto generated base class for the model ArtQkStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const ArtQkStddevPopFieldsModelBase = ModelBase
  .named('ArtQkStddevPopFields')
  .props({
    __typename: types.optional(types.literal("art_qk_stddev_pop_fields"), "art_qk_stddev_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkStddevPopFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkStddevPopFields() {
  return new ArtQkStddevPopFieldsModelSelector()
}

export const artQkStddevPopFieldsModelPrimitives = selectFromArtQkStddevPopFields().sort
