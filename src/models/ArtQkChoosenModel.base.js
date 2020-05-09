/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { ArtQkModel } from "./ArtQkModel"
import { ArtQkModelSelector } from "./ArtQkModel.base"


/**
 * ArtQkChoosenBase
 * auto generated base class for the model ArtQkChoosenModel.
 *
 * columns and relationships of "art_qk_choosen"
 */
export const ArtQkChoosenModelBase = ModelBase
  .named('ArtQkChoosen')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen"), "art_qk_choosen"),
    /** An object relationship */
    art: types.union(types.undefined, types.late(() => ArtModel)),
    art_id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    art_qk: types.union(types.undefined, types.late(() => ArtQkModel)),
    qk_name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkChoosenModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  art_qk(builder) { return this.__child(`art_qk`, ArtQkModelSelector, builder) }
}
export function selectFromArtQkChoosen() {
  return new ArtQkChoosenModelSelector()
}

export const artQkChoosenModelPrimitives = selectFromArtQkChoosen().art_id.qk_name
