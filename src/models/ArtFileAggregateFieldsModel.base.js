/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtFileMaxFieldsModel } from "./ArtFileMaxFieldsModel"
import { ArtFileMaxFieldsModelSelector } from "./ArtFileMaxFieldsModel.base"
import { ArtFileMinFieldsModel } from "./ArtFileMinFieldsModel"
import { ArtFileMinFieldsModelSelector } from "./ArtFileMinFieldsModel.base"


/**
 * ArtFileAggregateFieldsBase
 * auto generated base class for the model ArtFileAggregateFieldsModel.
 *
 * aggregate fields of "art_file"
 */
export const ArtFileAggregateFieldsModelBase = ModelBase
  .named('ArtFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("art_file_aggregate_fields"), "art_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ArtFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ArtFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, ArtFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ArtFileMinFieldsModelSelector, builder) }
}
export function selectFromArtFileAggregateFields() {
  return new ArtFileAggregateFieldsModelSelector()
}

export const artFileAggregateFieldsModelPrimitives = selectFromArtFileAggregateFields().count
