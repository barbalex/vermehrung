/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtRevVarPopFieldsBase
 * auto generated base class for the model ArtRevVarPopFieldsModel.
 *
 * aggregate var_pop on columns
 */
export const ArtRevVarPopFieldsModelBase = ModelBase
  .named('ArtRevVarPopFields')
  .props({
    __typename: types.optional(types.literal("art_rev_var_pop_fields"), "art_rev_var_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtRevVarPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromArtRevVarPopFields() {
  return new ArtRevVarPopFieldsModelSelector()
}

export const artRevVarPopFieldsModelPrimitives = selectFromArtRevVarPopFields()._depth
