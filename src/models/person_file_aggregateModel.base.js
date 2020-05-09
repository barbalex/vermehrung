/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelSelector } from "./person_fileModel.base"
import { person_file_aggregate_fieldsModel } from "./person_file_aggregate_fieldsModel"
import { person_file_aggregate_fieldsModelSelector } from "./person_file_aggregate_fieldsModel.base"


/**
 * person_file_aggregateBase
 * auto generated base class for the model person_file_aggregateModel.
 *
 * aggregated selection of "person_file"
 */
export const person_file_aggregateModelBase = ModelBase
  .named('person_file_aggregate')
  .props({
    __typename: types.optional(types.literal("person_file_aggregate"), "person_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => person_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => person_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, person_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, person_fileModelSelector, builder) }
}
export function selectFromperson_file_aggregate() {
  return new person_file_aggregateModelSelector()
}

export const person_file_aggregateModelPrimitives = selectFromperson_file_aggregate()
