/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturFileAggregateFieldsModel } from "./KulturFileAggregateFieldsModel"
import { KulturFileAggregateFieldsModelSelector } from "./KulturFileAggregateFieldsModel.base"
import { KulturFileModel } from "./KulturFileModel"
import { KulturFileModelSelector } from "./KulturFileModel.base"


/**
 * KulturFileAggregateBase
 * auto generated base class for the model KulturFileAggregateModel.
 *
 * aggregated selection of "kultur_file"
 */
export const KulturFileAggregateModelBase = ModelBase
  .named('KulturFileAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_file_aggregate"), "kultur_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturFileModelSelector, builder) }
}
export function selectFromKulturFileAggregate() {
  return new KulturFileAggregateModelSelector()
}

export const kulturFileAggregateModelPrimitives = selectFromKulturFileAggregate()
