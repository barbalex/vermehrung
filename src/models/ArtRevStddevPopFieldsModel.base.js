/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevStddevPopFieldsBase
 * auto generated base class for the model ArtRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const ArtRevStddevPopFieldsModelBase = ModelBase
  .named('ArtRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("art_rev_stddev_pop_fields"), "art_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevStddevPopFields() {
  return new ArtRevStddevPopFieldsModelSelector()
}

export const artRevStddevPopFieldsModelPrimitives = selectFromArtRevStddevPopFields()._depth
