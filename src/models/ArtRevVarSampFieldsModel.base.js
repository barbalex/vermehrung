/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevVarSampFieldsBase
 * auto generated base class for the model ArtRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const ArtRevVarSampFieldsModelBase = ModelBase
  .named('ArtRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("art_rev_var_samp_fields"), "art_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevVarSampFields() {
  return new ArtRevVarSampFieldsModelSelector()
}

export const artRevVarSampFieldsModelPrimitives = selectFromArtRevVarSampFields()._depth
