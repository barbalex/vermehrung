/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_art_max_fieldsModel } from "./ae_art_max_fieldsModel"
import { ae_art_max_fieldsModelSelector } from "./ae_art_max_fieldsModel.base"
import { ae_art_min_fieldsModel } from "./ae_art_min_fieldsModel"
import { ae_art_min_fieldsModelSelector } from "./ae_art_min_fieldsModel.base"


/**
 * ae_art_aggregate_fieldsBase
 * auto generated base class for the model ae_art_aggregate_fieldsModel.
 *
 * aggregate fields of "ae_art"
 */
export const ae_art_aggregate_fieldsModelBase = ModelBase
  .named('ae_art_aggregate_fields')
  .props({
    __typename: types.optional(types.literal("ae_art_aggregate_fields"), "ae_art_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ae_art_max_fieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ae_art_min_fieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_art_aggregate_fieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, ae_art_max_fieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ae_art_min_fieldsModelSelector, builder) }
}
export function selectFromae_art_aggregate_fields() {
  return new ae_art_aggregate_fieldsModelSelector()
}

export const ae_art_aggregate_fieldsModelPrimitives = selectFromae_art_aggregate_fields().count
