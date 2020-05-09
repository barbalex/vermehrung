/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkStddevFieldsBase
 * auto generated base class for the model ArtQkStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const ArtQkStddevFieldsModelBase = ModelBase
  .named('ArtQkStddevFields')
  .props({
    __typename: types.optional(types.literal("art_qk_stddev_fields"), "art_qk_stddev_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkStddevFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkStddevFields() {
  return new ArtQkStddevFieldsModelSelector()
}

export const artQkStddevFieldsModelPrimitives = selectFromArtQkStddevFields().sort
