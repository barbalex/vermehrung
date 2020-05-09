/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkChoosenMaxFieldsModel } from "./KulturQkChoosenMaxFieldsModel"
import { KulturQkChoosenMaxFieldsModelSelector } from "./KulturQkChoosenMaxFieldsModel.base"
import { KulturQkChoosenMinFieldsModel } from "./KulturQkChoosenMinFieldsModel"
import { KulturQkChoosenMinFieldsModelSelector } from "./KulturQkChoosenMinFieldsModel.base"


/**
 * KulturQkChoosenAggregateFieldsBase
 * auto generated base class for the model KulturQkChoosenAggregateFieldsModel.
 *
 * aggregate fields of "kultur_qk_choosen"
 */
export const KulturQkChoosenAggregateFieldsModelBase = ModelBase
  .named('KulturQkChoosenAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_aggregate_fields"), "kultur_qk_choosen_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkChoosenAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, KulturQkChoosenMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturQkChoosenMinFieldsModelSelector, builder) }
}
export function selectFromKulturQkChoosenAggregateFields() {
  return new KulturQkChoosenAggregateFieldsModelSelector()
}

export const kulturQkChoosenAggregateFieldsModelPrimitives = selectFromKulturQkChoosenAggregateFields().count
