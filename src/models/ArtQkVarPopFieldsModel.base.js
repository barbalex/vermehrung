/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkVarPopFieldsBase
 * auto generated base class for the model ArtQkVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const ArtQkVarPopFieldsModelBase = ModelBase
  .named('ArtQkVarPopFields')
  .props({
    __typename: types.optional(types.literal("art_qk_var_pop_fields"), "art_qk_var_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkVarPopFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromArtQkVarPopFields() {
  return new ArtQkVarPopFieldsModelSelector()
}

export const artQkVarPopFieldsModelPrimitives = selectFromArtQkVarPopFields().sort
