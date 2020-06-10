/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * av_max_fieldsBase
 * auto generated base class for the model av_max_fieldsModel.
 */
export const av_max_fieldsModelBase = ModelBase
  .named('av_max_fields')
  .props({
    __typename: types.optional(types.literal("av_max_fields"), "av_max_fields"),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class av_max_fieldsModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromav_max_fields() {
  return new av_max_fieldsModelSelector()
}

export const av_max_fieldsModelPrimitives = selectFromav_max_fields().art_id.person_id
