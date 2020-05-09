/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AeArtMaxFieldsModel } from "./AeArtMaxFieldsModel"
import { AeArtMaxFieldsModelSelector } from "./AeArtMaxFieldsModel.base"
import { AeArtMinFieldsModel } from "./AeArtMinFieldsModel"
import { AeArtMinFieldsModelSelector } from "./AeArtMinFieldsModel.base"


/**
 * AeArtAggregateFieldsBase
 * auto generated base class for the model AeArtAggregateFieldsModel.
 *
 * aggregate fields of "ae_art"
 */
export const AeArtAggregateFieldsModelBase = ModelBase
  .named('AeArtAggregateFields')
  .props({
    __typename: types.optional(types.literal("ae_art_aggregate_fields"), "ae_art_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => AeArtMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => AeArtMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AeArtAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, AeArtMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, AeArtMinFieldsModelSelector, builder) }
}
export function selectFromAeArtAggregateFields() {
  return new AeArtAggregateFieldsModelSelector()
}

export const aeArtAggregateFieldsModelPrimitives = selectFromAeArtAggregateFields().count
