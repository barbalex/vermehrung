/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * AvArtMinFieldsBase
 * auto generated base class for the model AvArtMinFieldsModel.
 *
 * aggregate min on columns
 */
export const AvArtMinFieldsModelBase = ModelBase
  .named('AvArtMinFields')
  .props({
    __typename: types.optional(types.literal("av_art_min_fields"), "av_art_min_fields"),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AvArtMinFieldsModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromAvArtMinFields() {
  return new AvArtMinFieldsModelSelector()
}

export const avArtMinFieldsModelPrimitives = selectFromAvArtMinFields().art_id.person_id
