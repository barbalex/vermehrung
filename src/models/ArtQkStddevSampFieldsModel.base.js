/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkStddevSampFieldsBase
 * auto generated base class for the model ArtQkStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const ArtQkStddevSampFieldsModelBase = ModelBase
  .named('ArtQkStddevSampFields')
  .props({
    __typename: types.optional(types.literal("art_qk_stddev_samp_fields"), "art_qk_stddev_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkStddevSampFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkStddevSampFields() {
  return new ArtQkStddevSampFieldsModelSelector()
}

export const artQkStddevSampFieldsModelPrimitives = selectFromArtQkStddevSampFields().sort
