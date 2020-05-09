/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkChoosenMaxFieldsModel } from "./ArtQkChoosenMaxFieldsModel"
import { ArtQkChoosenMaxFieldsModelSelector } from "./ArtQkChoosenMaxFieldsModel.base"
import { ArtQkChoosenMinFieldsModel } from "./ArtQkChoosenMinFieldsModel"
import { ArtQkChoosenMinFieldsModelSelector } from "./ArtQkChoosenMinFieldsModel.base"


/**
 * ArtQkChoosenAggregateFieldsBase
 * auto generated base class for the model ArtQkChoosenAggregateFieldsModel.
 *
 * aggregate fields of "art_qk_choosen"
 */
export const ArtQkChoosenAggregateFieldsModelBase = ModelBase
  .named('ArtQkChoosenAggregateFields')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_aggregate_fields"), "art_qk_choosen_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkChoosenAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, ArtQkChoosenMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, ArtQkChoosenMinFieldsModelSelector, builder) }
}
export function selectFromArtQkChoosenAggregateFields() {
  return new ArtQkChoosenAggregateFieldsModelSelector()
}

export const artQkChoosenAggregateFieldsModelPrimitives = selectFromArtQkChoosenAggregateFields().count
