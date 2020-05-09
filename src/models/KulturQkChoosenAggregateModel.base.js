/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkChoosenAggregateFieldsModel } from "./KulturQkChoosenAggregateFieldsModel"
import { KulturQkChoosenAggregateFieldsModelSelector } from "./KulturQkChoosenAggregateFieldsModel.base"
import { KulturQkChoosenModel } from "./KulturQkChoosenModel"
import { KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"


/**
 * KulturQkChoosenAggregateBase
 * auto generated base class for the model KulturQkChoosenAggregateModel.
 *
 * aggregated selection of "kultur_qk_choosen"
 */
export const KulturQkChoosenAggregateModelBase = ModelBase
  .named('KulturQkChoosenAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_aggregate"), "kultur_qk_choosen_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturQkChoosenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkChoosenAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturQkChoosenAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturQkChoosenModelSelector, builder) }
}
export function selectFromKulturQkChoosenAggregate() {
  return new KulturQkChoosenAggregateModelSelector()
}

export const kulturQkChoosenAggregateModelPrimitives = selectFromKulturQkChoosenAggregate()
