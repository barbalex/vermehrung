/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtVarSampFieldsBase
 * auto generated base class for the model ArtVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const ArtVarSampFieldsModelBase = ModelBase
  .named('ArtVarSampFields')
  .props({
    __typename: types.optional(types.literal("art_var_samp_fields"), "art_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtVarSampFields() {
  return new ArtVarSampFieldsModelSelector()
}

export const artVarSampFieldsModelPrimitives = selectFromArtVarSampFields()._depth
