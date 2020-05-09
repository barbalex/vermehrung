/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkVarSampFieldsBase
 * auto generated base class for the model ArtQkVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const ArtQkVarSampFieldsModelBase = ModelBase
  .named('ArtQkVarSampFields')
  .props({
    __typename: types.optional(types.literal("art_qk_var_samp_fields"), "art_qk_var_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkVarSampFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkVarSampFields() {
  return new ArtQkVarSampFieldsModelSelector()
}

export const artQkVarSampFieldsModelPrimitives = selectFromArtQkVarSampFields().sort
