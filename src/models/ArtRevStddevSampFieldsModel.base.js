/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevStddevSampFieldsBase
 * auto generated base class for the model ArtRevStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const ArtRevStddevSampFieldsModelBase = ModelBase
  .named('ArtRevStddevSampFields')
  .props({
    __typename: types.optional(types.literal("art_rev_stddev_samp_fields"), "art_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevStddevSampFields() {
  return new ArtRevStddevSampFieldsModelSelector()
}

export const artRevStddevSampFieldsModelPrimitives = selectFromArtRevStddevSampFields()._depth
