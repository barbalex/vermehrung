/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtStddevFieldsBase
 * auto generated base class for the model ArtStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const ArtStddevFieldsModelBase = ModelBase
  .named('ArtStddevFields')
  .props({
    __typename: types.optional(types.literal("art_stddev_fields"), "art_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtStddevFields() {
  return new ArtStddevFieldsModelSelector()
}

export const artStddevFieldsModelPrimitives = selectFromArtStddevFields()._depth
