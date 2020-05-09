/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ArtQkChoosenMaxFieldsBase
 * auto generated base class for the model ArtQkChoosenMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const ArtQkChoosenMaxFieldsModelBase = ModelBase
  .named('ArtQkChoosenMaxFields')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_max_fields"), "art_qk_choosen_max_fields"),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkChoosenMaxFieldsModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
}
export function selectFromArtQkChoosenMaxFields() {
  return new ArtQkChoosenMaxFieldsModelSelector()
}

export const artQkChoosenMaxFieldsModelPrimitives = selectFromArtQkChoosenMaxFields().art_id.qk_name
