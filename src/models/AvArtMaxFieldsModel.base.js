/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * AvArtMaxFieldsBase
 * auto generated base class for the model AvArtMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const AvArtMaxFieldsModelBase = ModelBase
  .named('AvArtMaxFields')
  .props({
    __typename: types.optional(types.literal("av_art_max_fields"), "av_art_max_fields"),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AvArtMaxFieldsModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromAvArtMaxFields() {
  return new AvArtMaxFieldsModelSelector()
}

export const avArtMaxFieldsModelPrimitives = selectFromAvArtMaxFields().art_id.person_id
