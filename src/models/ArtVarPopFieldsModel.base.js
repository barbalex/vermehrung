/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtVarPopFieldsBase
 * auto generated base class for the model ArtVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const ArtVarPopFieldsModelBase = ModelBase
  .named('ArtVarPopFields')
  .props({
    __typename: types.optional(types.literal("art_var_pop_fields"), "art_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtVarPopFields() {
  return new ArtVarPopFieldsModelSelector()
}

export const artVarPopFieldsModelPrimitives = selectFromArtVarPopFields()._depth
